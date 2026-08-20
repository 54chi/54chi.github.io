---
title: Blogging anywhere system
date: 2026-08-20
time: 13:57
tags:
  - rant
  - slow-life
  - blogging
---

This blog is in github, and each post is a markdown file.
Obsidian notes are markdown files, and the editor is nice. 
So have obsidian open your local github repo as a new vault and edit from there to improve the writer's experience. Just don't forget to git push your changes and you'll be golden.

Some issues (as far as I know):
- Each repo requires its own vault. This can create friction if there is another "main" vault and have to switch just to write a blog post.
- The vaults used for the blog will have issues syncing to be used across multiple devices (e.g. PC, iPhone, iPad). It is not catastrophic (can be fixed by cloning the repo again) but can be annoying.

There are paid solutions around, but if multiple devices are needed, here is a simpler workaround:
Use the "main" obsidian vault (which is synced with other devices) to write the blog posts in it. Once ready, copy paste the contents to the github repos for the blogs in a PC that has the synced obsidian vault and push the changes.

Pro: the graph view now includes the blog posts.
Con: publishing may be delayed.

At the end of it, the question is where do you want the friction to be? During the writing process or the publishing? And if the latter, would you rather deal with git re-cloning or with copy pasting?

For me, keeping separate vaults for separate blogs, is a friction point that won't make me share posts, and since my blog "engine" includes the date in the title, identifying what needs to be copy pasted is easy. I can probably write a script to automate that too, but is not that big of a deal for me.

## TL;DR:

1. In your obsidian, create a folder for your blog (i.e. `/54chi.github.io`). Inside that folder, duplicate the structure of where your markdowns will go (e.g. `/images`,`/posts`).
2. Write your blog posts as notes (use a template to expedite the creation of the notes -- I use QuickAdd). You can do this from an iphone.
3. When ready to publish, open your PC and copy paste the content to the github repo
4. Git commit and push

54chi