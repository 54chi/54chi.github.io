---
title: "CMS Project:  Publishing platform/blog"
date: 2016-01-15
tags: [ghost, cms, projects]
---

First project of the year was to set up a CMS (Content Management System) to document my rantings.

##### The Problem

At the enterprise level, CMSs don't change much (unless you are a publishing company, like a newspaper), but their sites may still experience high traffic (e.g. from employees and/or customers). The majority of the "Enterprise CMSs" out there are based under the concept of components, web parts or what not, with WYSIWYG interfaces built in the sites themselves.

The overhead these create on the web servers is not small: more servers, processing power, memory, space, higher maintenance, licensing costs, etc. etc. Ironically, the main beneficiaries are the content creators and not their target audience.

##### A Solution

The secret plan was to create a tool to generate CLEAN HTML from a typical CMS database via headless browser and crawling like PhantomJS.

To keep things contained, I set up some constraints in advance:

1.  Support of [markdown](https://daringfireball.net/projects/markdown/syntax) as its primary way of writing (I need to practice my "markdowns"!)
2.  Version control for the pages
3.  Offline capabilities (so I can write without internet connectivity)
4.  WYSIWYG editor (or at least an easy way to create content)
5.  Portable

Markdown has been around for a while now, and any respected blogger/author should know it as a way to keep content standardized (vs. the freedom and temptation of doing everything directly in HTML).

I won't have a team of people constantly updating content, so the version control is more for disaster recovery than conflict resolution.

However, I do plan to travel a lot, and many of those places may not have internet available. Been able to write stuff on the fly and later sync it on the cloud is awesome.

And like some people feel more inspired to write when they have good quality materials (aka: moleskine snobs), I want to have a decent looking editor to write content (I can do it with a regular code editor like [atom](http://atom.io), but I like it more if I don't have to be worrying about saving images in a particular folder with a particular name and worrying about the name of the post...that's a pain)

Lastly, this is one more website that I've done for me. I've done bloggers, wordpress, mediums, ghosts, tumblrs, etc.; plus several custom ones with php, rails, .net and python. The problem is that I eventually get bored of them and stop writing there...and let them die. This one will be different. All the posts will be kept for posterity in HTML format, so I can move them anywhere I want them in the future if I feel like it.

I played around with [Jekyll](https://jekyllrb.com/) (ruby, no editor), [Ghost+buster](https://ghost.org/) (buster is a pain to install in windows), [Hugo](https://gohugo.io/) (but I'm no Go expert) and [Hexo](https://hexo.io/) (no editor). They all have their pros and cons, but I needed an online editor, so I eventually got Buster up and running in my Windows 10 installation (after fixing a bunch of issues cause nobody seems to do Python with Windows) and github pages to host the website.

As part of the flow, I also created a custom Ghost theme (including CSS Comic libraries) that can be found [here](https://github.com/54chi/ghostTheme-bleak54)

Future changes (upcoming months):

-   Add a welcome landing page (1/25/16)
-   Update the stylesheet/theme (1/25/16)
-   Add new sections (1/25/16)
-   RWD (2/16/16)
-   Improve Ghost Theme Documentation (2/16/16)
-   Clean up source code (e.g. remove extras) (2/16/16)
