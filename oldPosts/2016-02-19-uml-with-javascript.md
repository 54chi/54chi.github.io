---
title: "UML with Javascript"
date: 2016-02-19
tags: [blog]
---

As my projects are getting more and more complex, I'm going to need a better way to describe them.

Enter UML.

Typically, an Architect or Designer will use something like Visio and then convert the diagram into an image before sharing it, assuming such Architect is stuck in the 1990's (great decade, but is time to let it go)

A better way for me is to use a semantic way to describe my diagrams (aka: text), so is easier to update and works very well with version control. There are many solutions out there, but I set up for [mermaid](http://54chi.com/uml-with-javascript/knsv.github.io/mermaid). It runs straight from the browser and the format is very similar to PlantUML, another favorite. It doesn't have all the diagrams in the universe, but for what I need is more than enough.

Here is one example:

mermaid.initialize({startOnLoad:true});

sequenceDiagram Alice->>John: Hello John, how are you? John-->>Alice: Great!

And another one:

graph TB sq\[Square shape\] --> ci((Circle shape)) subgraph A subgraph od>Odd shape\]-- Two line  
edge comment --> ro di{Diamond with  
line break} -.-> ro(Rounded  
square  
shape) di==>ro2(Rounded square shape) end e --> od3>Really long text with linebreak  
in an Odd shape\] %% Comments after double percent signs e((Inner / circle  
and some odd  
special characters)) --> f(,.?!+-\*ز) cyr\[Cyrillic\]-->cyr2((Circle shape Начало));
