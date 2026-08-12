---
title: "HTML5 project: CSS Comics"
date: 2016-01-26
tags: [projects]
---

The second project was to create an HTML based comic strip and connect it to this site via tagging.

By doing this, the objective is to practice and polish CSS concepts, and more importantly, practice semantic HTML concepts.

#### Anatomy of a CSS comic

Semantic HTML for a comic:

-   Every strip belongs to a class `csscomic`
-   Within it, a single `<ul>` tag is used for all the comic vignettes (`<li>`). Each `li` can have a class to specify its background, vignette size, etc. etc.
-   The vignettes can have several `div` for each "actor" or object. Via classes, you can specify which actor to use, where it is positioned and whether it is facing left or right.
-   Finally, within each actor, a `div` bubble can be set to show a dialog.

E.g.

```
<div class="csscomic">  
  <ul>
    <li>
      <div class="actor actor1 left">
        <div class="bubble">
          Hello, I'm actor 1.
        </div>
      </div>
      <div class="actor actor2 flip right>
        <div class="bubble">
          Oh, hi! I'm actor 2.
        </div>
      </div>
    </li>
  </ul>
</div>  
```

#### Examples

You can see css comics in action [here](../css-comics/index.html) and [here](../tag/csscomics.2)

#### Future changes (TODO)

-   Add more and better comic characters
-   Improve and clean up the CSS
-   Improve the template for the comic
