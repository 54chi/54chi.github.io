---
layout: post
title: "Writing Technical Documentation"
author: "54chi"
date: 2017-10-07 16:33:08
tags:
- documentation
- plantuml
- asciidoc
---

Another day, another rant. The developers never have the time to jump back from their IDE of choice into Word or PDF editor, and write or update documentation; and sadly most technical writers are not usually involved enough to understand what needs to be documented or how to perform efficiently.

It doesn't have to be that way. Develepers could (and should) document their code from within their IDEs and as part of their deployment process. It is much useful to keep it as part of their repos, so there is less interruptions by having to switch between something like Atom to Word or some website like Confluence or SharePoint (ugh).

There are couple good options: **markdown** and **asciidoc**. They both count with a very nice ecosystem for writing technical stuff, but asciidoc is more powerful. [**Asciidoc**](http://asciidoctor.org/docs/what-is-asciidoc/), while very similar to **markdown**, has some extra features for nicer document creation, including support for tables and composition out of the box. The learning curve is a bit steeper than markdown, but tech teams are used to code, so we are fine on not having everything WYSIWYG while in edit mode, right? (and even if we were, there are plugins for your IDE of choice that should fix that)

Asciidoc docs are plain text, so it lives pretty well within github or bitbucket projects, compatible with their version control, and most building tool integrations. There are also nice extensions, my favorites being [asciidoctor-pdf](https://github.com/asciidoctor/asciidoctor-pdf) to create PDFs and [asciidoctor-diagram](https://github.com/asciidoctor/asciidoctor-diagram) to create UML diagrams from plain text.

For my own docs, I have an "stylesheet" applied to the way the document is rendered (based on Zurb's Foundation), so it doesn't look too boring. When sharing this with potential co-writers, is important to also have a styleguide, so we all share a common standard on how the documentation is going to be stylized (e.g. header, vs. subheader, etc.) Something like the one used for [O'Reilly Books](http://docs.atlas.oreilly.com/writing_in_asciidoc.html) which is also in asciidoc.

Obviously, I don't feel like installing all the dependencies needed to make an asciidoc render as an HTML, PDF, ebook or whatever. Luckily, there is a [dockerfile](https://github.com/asciidoctor/docker-asciidoctor) for that.

PS. Asciidoctor and Asciidoc are not the same, but they are so similar that it shouldn't really matter much. For a detail list of differences, you can check [here](http://asciidoctor.org/docs/asciidoc-asciidoctor-diffs/)
