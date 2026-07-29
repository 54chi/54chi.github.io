#!/usr/bin/env python3
"""
Regenerate posts.json from the front matter of posts/*.md.

posts.json is the only file the site reads to build the index and to decide
what sky each post gets (assets/js/deck.js feeds date/time/slug straight into
PixelScene.render). It used to be maintained by hand, which drifted: one post
was listed under a date that disagreed with its own front matter, making "the
latest post" -- what the landing page opens on -- ambiguous.

Front matter is now the source of truth and this file is derived. It is fully
reproducible: delete posts.json, re-run, get the same bytes back. Nothing here
reads the previous contents.

Usage:
    python3 tools/index_posts.py            # rewrite posts.json
    python3 tools/index_posts.py --check    # exit 1 if posts.json is stale

Stdlib only, on purpose -- the repo has no build step and CI installs nothing.
"""

import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS_DIR = os.path.join(ROOT, "posts")
INDEX_PATH = os.path.join(ROOT, "posts.json")

# Coarse day/night keywords normalise to these. Both sit well inside the
# hour >= 6 and hour < 18 test in assets/js/scene.js, so they can't drift over
# the boundary if that window is ever nudged.
KEYWORD_TIMES = {"day": "12:00", "night": "21:00"}

DEFAULT_TIME = "12:00"

# The Jekyll migration added 37 posts in one commit, so git reports every one
# of them as created 2026-06-08T18:46 -- that is when the files were moved, not
# when they were written. Trusting it would give 37 posts a confident-looking
# evening timestamp and flip them all to night skies. Posts added by this
# commit fall through to the default instead, until real times are backfilled
# into their front matter. Once that is done this guard is dead code.
MIGRATION_COMMIT = "33dc6e4ed0e0565e184e48a9208e389a18c4216e"

FM_PATTERN = re.compile(r"\A---\r?\n(.*?)\r?\n---\r?\n", re.DOTALL)
TIME_PATTERN = re.compile(r"\A([01]\d|2[0-3]):([0-5]\d)\Z")


class PostError(Exception):
    """A post we refuse to guess about."""


def parse_front_matter(text, filename):
    """
    Pull the front matter block into a dict of raw string values.

    Deliberately not a YAML parser: the repo has no dependencies and every post
    uses the same flat `key: value` shape. Anything that doesn't match that
    shape raises rather than being silently skipped, because a quietly dropped
    field would corrupt the index and break the site.
    """
    match = FM_PATTERN.match(text)
    if not match:
        raise PostError("%s: no front matter block" % filename)

    fields = {}
    for lineno, line in enumerate(match.group(1).splitlines(), start=2):
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if ":" not in line:
            raise PostError("%s:%d: not a `key: value` line: %r" % (filename, lineno, line))
        key, value = line.split(":", 1)
        fields[key.strip()] = value.strip()

    return fields


def unquote(value):
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        return value[1:-1]
    return value


def parse_tags(raw):
    """`[a, b]` or a bare `a` -> ['a', 'b'] / ['a']. Empty stays empty."""
    raw = raw.strip()
    if raw.startswith("[") and raw.endswith("]"):
        raw = raw[1:-1]
    return [unquote(t.strip()) for t in raw.split(",") if t.strip()]


def git_created_at(path):
    """
    ISO timestamp of the commit that added `path`, or None.

    Returns None when the adding commit is the migration commit, or when git
    can't answer -- which is what a shallow clone looks like, so CI checks out
    with fetch-depth: 0.
    """
    try:
        out = subprocess.run(
            ["git", "log", "--diff-filter=A", "--follow", "--format=%H %aI", "-1", "--", path],
            cwd=ROOT, capture_output=True, text=True, check=True,
        ).stdout.strip()
    except (subprocess.CalledProcessError, OSError):
        return None

    if not out:
        return None

    sha, _, stamp = out.partition(" ")
    if sha == MIGRATION_COMMIT:
        return None
    return stamp or None


def resolve_time(fields, path, filename):
    """
    Returns (time, guessed). First match wins:
      1. front matter `time:` -- HH:MM, or the keywords day / night
      2. the commit that added the file
      3. DEFAULT_TIME, flagged as a guess
    """
    raw = fields.get("time")
    if raw is not None:
        value = unquote(raw).strip()
        lowered = value.lower()
        if lowered in KEYWORD_TIMES:
            # Coarse on purpose: flag it so the readout shows "~" rather than
            # implying a precision the author never claimed.
            return KEYWORD_TIMES[lowered], True
        if TIME_PATTERN.match(value):
            return value, False
        raise PostError(
            "%s: time must be HH:MM or one of %s, got %r"
            % (filename, "/".join(sorted(KEYWORD_TIMES)), value)
        )

    created = git_created_at(path)
    if created:
        return created[11:16], False

    return DEFAULT_TIME, True


def build_entry(filename):
    path = os.path.join(POSTS_DIR, filename)
    with open(path, encoding="utf-8") as handle:
        text = handle.read()

    fields = parse_front_matter(text, filename)

    for required in ("title", "date"):
        if required not in fields:
            raise PostError("%s: missing required `%s:`" % (filename, required))

    date = unquote(fields["date"])
    if not re.match(r"\A\d{4}-\d{2}-\d{2}\Z", date):
        raise PostError("%s: date must be YYYY-MM-DD, got %r" % (filename, date))

    time, guessed = resolve_time(fields, path, filename)

    entry = {
        "slug": os.path.splitext(filename)[0],
        "title": unquote(fields["title"]),
        "date": date,
        "tags": parse_tags(fields.get("tags", "")),
        "time": time,
    }
    if guessed:
        entry["timeGuessed"] = True
    return entry


def build_index():
    filenames = sorted(f for f in os.listdir(POSTS_DIR) if f.endswith(".md"))
    if not filenames:
        raise PostError("no posts found in %s" % POSTS_DIR)

    entries, problems = [], []
    for filename in filenames:
        try:
            entries.append(build_entry(filename))
        except PostError as err:
            problems.append(str(err))

    if problems:
        raise PostError("\n".join(problems))

    # Newest first -- deck.js opens on entry 0.
    entries.sort(key=lambda e: (e["date"], e["time"]), reverse=True)
    return json.dumps(entries, indent=2, ensure_ascii=False) + "\n"


def main(argv):
    check_only = "--check" in argv[1:]

    try:
        rendered = build_index()
    except PostError as err:
        sys.stderr.write("error:\n%s\n" % err)
        return 1

    existing = None
    if os.path.exists(INDEX_PATH):
        with open(INDEX_PATH, encoding="utf-8") as handle:
            existing = handle.read()

    if existing == rendered:
        print("posts.json up to date (%d posts)" % len(json.loads(rendered)))
        return 0

    if check_only:
        sys.stderr.write(
            "posts.json is stale -- run `python3 tools/index_posts.py` and commit the result\n"
        )
        return 1

    with open(INDEX_PATH, "w", encoding="utf-8") as handle:
        handle.write(rendered)

    entries = json.loads(rendered)
    guessed = sum(1 for e in entries if e.get("timeGuessed"))
    print("wrote posts.json (%d posts, %d without an exact time)" % (len(entries), guessed))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
