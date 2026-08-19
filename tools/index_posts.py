#!/usr/bin/env python3
"""
Regenerate posts.json from the front matter of posts/*.md.

posts.json is the only file the site reads to build the index and to decide
what sky each post gets (assets/js/deck.js feeds date/time/slug straight into
PixelScene.render). It used to be maintained by hand, which drifted: one post
was listed under a date that disagreed with its own front matter, making "the
latest post" -- what the landing page opens on -- ambiguous.

Front matter is the source of truth and this file is derived. It is fully
reproducible: delete posts.json, re-run, get the same bytes back. Nothing here
reads the previous contents.

Only posts/ is indexed. oldPosts/ is deliberately out of scope.

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

FM_PATTERN = re.compile(r"\A---\r?\n(.*?)\r?\n---\r?\n", re.DOTALL)
TIME_PATTERN = re.compile(r"\A([01]\d|2[0-3]):([0-5]\d)\Z")


class PostError(Exception):
    """A post we refuse to guess about."""


def parse_front_matter(text, filename):
    """
    Pull the front matter block into a dict of str or list values.

    Deliberately not a YAML parser -- the repo has no dependencies. It covers
    the shapes these posts actually use: `key: value` scalars, inline
    `[a, b]` arrays, and the block sequences Obsidian writes:

        tags:
          - slow-life
          - rant

    Anything outside that raises rather than being silently skipped, because a
    quietly dropped field would corrupt the index and break the site.
    """
    match = FM_PATTERN.match(text)
    if not match:
        raise PostError("%s: no front matter block" % filename)

    fields = {}
    pending = None  # key whose value may be an indented block sequence

    for lineno, line in enumerate(match.group(1).splitlines(), start=2):
        if not line.strip() or line.lstrip().startswith("#"):
            continue

        stripped = line.strip()

        if stripped == "-" or stripped.startswith("- "):
            if pending is None:
                raise PostError(
                    "%s:%d: list item with no key above it: %r" % (filename, lineno, line)
                )
            fields[pending].append(unquote(stripped[1:].strip()))
            continue

        if ":" not in line:
            raise PostError("%s:%d: not a `key: value` line: %r" % (filename, lineno, line))

        key, value = line.split(":", 1)
        key, value = key.strip(), value.strip()

        if value:
            fields[key] = value
            pending = None
        else:
            # Bare `key:` -- either a block sequence follows or it's empty.
            fields[key] = []
            pending = key

    return fields


def unquote(value):
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        return value[1:-1]
    return value


def scalar(fields, key, filename, required=True):
    """Fetch a single-valued field, rejecting a block sequence."""
    value = fields.get(key)
    if value is None or value == []:
        if required:
            raise PostError("%s: missing required `%s:`" % (filename, key))
        return None
    if isinstance(value, list):
        raise PostError("%s: `%s:` must be a single value, got a list" % (filename, key))
    return unquote(value)


def parse_tags(raw):
    """Block sequence, inline `[a, b]`, or a bare `a` -> list of strings."""
    if isinstance(raw, list):
        return [t for t in (x.strip() for x in raw) if t]
    raw = raw.strip()
    if raw.startswith("[") and raw.endswith("]"):
        raw = raw[1:-1]
    return [unquote(t.strip()) for t in raw.split(",") if t.strip()]


def git_created_at(path):
    """
    ISO timestamp of the commit that added `path`, or None.

    None also covers a shallow clone, where the adding commit isn't present --
    which is why CI checks out with fetch-depth: 0.
    """
    try:
        out = subprocess.run(
            ["git", "log", "--diff-filter=A", "--follow", "--format=%aI", "-1", "--", path],
            cwd=ROOT, capture_output=True, text=True, check=True,
        ).stdout.strip()
    except (subprocess.CalledProcessError, OSError):
        return None
    return out or None


def resolve_time(fields, path, filename):
    """
    Returns (time, guessed). First match wins:
      1. front matter `time:` -- HH:MM, or the keywords day / night
      2. the commit that added the file
      3. DEFAULT_TIME, flagged as a guess
    """
    raw = scalar(fields, "time", filename, required=False)
    if raw is not None:
        value = raw.strip()
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

    title = scalar(fields, "title", filename)
    date = scalar(fields, "date", filename)
    if not re.match(r"\A\d{4}-\d{2}-\d{2}\Z", date):
        raise PostError("%s: date must be YYYY-MM-DD, got %r" % (filename, date))

    time, guessed = resolve_time(fields, path, filename)

    entry = {
        "slug": os.path.splitext(filename)[0],
        "title": title,
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
