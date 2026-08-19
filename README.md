# Blog
Originally powered by [Ghost](http://ghost.org) and [Buster](https://github.com/axitkhurana/buster/), but after going through a few other static page generators, ultimately set up with ~~[Jekyll](https://scotch.io/tutorials/getting-started-with-jekyll-plus-a-free-bootstrap-3-starter-theme)~~ PURE MARKDOWN, so I can sort of edit content directly within Github if needed.

# To use:
- ~~sudo npm install~~
- ~~sudo npm install -g gulp gulp-cli~~
- ~~sudo gulp~~
- just write your markdown under the posts folder.
- ~~update the `posts.json` "index" file.~~ a GitHub Action regenerates it on push.

Is it powerful? no.
Do I need it to be? no.

## Front matter

```yaml
---
title: "Post title"
date: 2026-06-08
time: "18:46"     # optional, see below
tags: [rant]
---
```

`title`, `date` and `tags` are required. `date` should match the filename prefix.

`time` decides whether the post's sky is day or night (`06:00`–`17:59` is day).
It takes either a clock time, or `day` / `night` when you don't remember the
hour — the site marks coarse times with a `~` instead of implying a precision
you never claimed. Leave it out and the commit that added the file is used;
failing that it defaults to `12:00`.

## Images

Paste into Obsidian as usual and reference it with the normal embed syntax:

```
![[Pasted image 20260818212333.jpg]]
![[diagram.png|An alt description]]
![[diagram.png|400]]              <- a bare number is a pixel width
```

The site resolves these against `images/`, so **set Obsidian's attachment
folder to `images/`** (Settings -> Files and links -> Default location for new
attachments). Out of the box Obsidian drops attachments in the vault root and
they won't resolve.

Photos are worth resizing before committing -- a phone/camera paste can be
10+ MB, and the deck prefetches neighbouring posts, so it costs visitors who
never open that post. ~1600px wide as JPEG is plenty for the column width.

## posts.json

Generated from the above — don't edit it by hand, your changes will be
overwritten on the next push. To regenerate locally:

```
python3 tools/index_posts.py            # rewrite it
python3 tools/index_posts.py --check    # just report if it's stale
```

To preview the site, serve it (the posts are fetched, so `file://` won't work):

```
python3 -m http.server 8000
```

Bonus points: since these are markdown files, should be easy to plug it with a markdown editor like [Obsidian](https://obsidian.md/) lowering the barrier to use it. 

~~## Jekyll Quicksheet:~~

~~`jekyll -v` to check the version~~
~~`jekyll serve` will run a local web server to check your updates~~

~~Since creating posts (sp. the filename) is a bit annoying, I used [this post](http://www.marcusoft.net/2014/12/my-post-scaffolder-for-jekyll.html) to also include a script to scaffold a post.~~

~~`bash scaffold_post.sh "A post title"` to create a post~~
