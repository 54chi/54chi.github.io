---
title: "Elm on top of Phoenix, on top of Elixir, on top of Erlang (and still superfast!!)"
date: 2016-03-15
tags: [blog]
---

10 years ago, I remember discovering this new programming language where one of the most popular tutorials were made as a cartoon. It was fun to write, and made a lot of sense (vs. the usual Java, .Net and PHP of that time). The premise was to make the dev life easier, so he/she can focus on the important things of the solution, instead of learning some weird syntax.

A couple months later, someone announced a framework on top of this language, with the goal of giving "instant gratification" and changing the way software was made up to that point.

The language was Ruby, and the framework was Rails. It took a few years for it to catch up, and now there are several software companies that deliver rails-based apps.

Rails was made for quick development (instant gratification, remember?), and although it was a joy to use, it was a huge pain to scale to the enterprise level (everybody remembers the early days of Twitter, right?). Rails is slower than your average compiled language, but there is little doubt that code done in Rails if on average of higher quality than the ones made in PHP, Java or .Net, thanks to its "opinionated" approach.

So, it reigned as the "cool" language for a while.

Until NodeJS came, and became more and more popular.

NodeJS base was the chrome browser Javascript interpreter. Because of its simplicity, it was lighter and faster than many other languages out there. Its main selling point is that it is just Javascript...and that can handle millions of transactions in commodity hardware (try to do that with a Java based enterprise solution, for example).

That was on paper, at least.

NodeJS is also single-threaded by default, which means that all these "multi-core" intel chips were underutilized. It also runs everything in an async way, so you had to know you way if you want to keep a sequential process under control. But once all the difficulties were surpassed, it worked fine. Many rails developers started the migration to NodeJS.

But people missed the nice syntax, the opinionated framework, the ease of use that Rails had. So, some dude from the Rails community embarked on a quest to find an alternative.

And Elixir was born.

Elixir is the Ruby equivalent of Rails, but with Erlang as its base. Erlang is a very old functional language (it was made for telecommunication companies), but is unbelievable fast and efficient when running concurrent processes. And because the Erlang virtual machine was created with this principles in mind, it is more stable too. Programs can run for years without any need for rebooting (e.g. because of the infamous memory leak). And you'll never need to shutdown a server because of updates in the code.

Sounds great. But...what's the catch?

The syntax is awful for most humans. Elixir solved this, by creating a layer on top of Erlang that looks very much like Ruby: elegant, and easy to understand. It also took inspiration from Scala, Lisp and Clojure,

But Elixir by itself can't do much for the web. Routers, APIs, database connectors are not part of it. It needed a web framework. Thus Phoenix came.

Phoenix code is like Rails, except that it is on top of Elixir. It shines when you need real time applications and/or thousands of transactions at the same time. It is also very nice to use. Just like rails.

Except that it is 20 times faster than Rails. And requires less hardware to run. And is more stable too, because of that Erlang VM thingy.

So far so good?

Cool.

Similar to what happened with Rails, you can create full stack apps with the Phoenix Framework. But the front end development moves faster than the backend these days, so whatever the framework gives you out of the box may not be what you want. E.g. it used to be jquery, then backbone, then angular, now react, etc. etc.

Enter Elm.

Elm follows the functional programming, but it is also reactive (FRP - Functional Reactive Programming), which makes working with Phoenix a breeze. The reason why I may not want any of the other more popular ones are because the level of abstraction that Elm gets (Elm code compiles to html, css and javascript at the same time), and it is very easy to make Elm a separate app that uses Phoenix, a precompiler for Phoenix code or code that runs within Phoenix with no major changes (I read somewhere that Phoenix uses Elm already to compile its stuff)

So: 2016 is going to be the year where I get to do this stuff. Not just because I want to, but because I believe this is the future (future=the next couple years :p). Enterprise IT has reached the level of maturity where they realize how important UX is to gain engagement, but the tools that are out there are based on code made when most people didn't know what internet was (e.g. async services/response time, heavy frameworks, no support for IoT, high hw demand, license costs, etc.).

I'll most likely push some of my NodeJS projects down the pipeline (or replace them with Elixir/Phoenix). E.g. I'm moving the Enterprise Collab tool that I had planned for July up for April. We'll see how far I get before complaining :D
