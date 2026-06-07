---
layout: post
title: "JWE Encryption in Node JS"
author: "54chi"
date: 2017-10-16 16:33:08
tags:
- nodejs
- encryption
- node-jose
---

I went to a fintech hackathon this weekend. The sponsor was one of those credit cards that like to have their web services as secure as possible (aka: old-school Java or C stuff). Out of the 4 APIs exposed, 3 of them needed some kind of ["JWE"](https://tools.ietf.org/html/rfc7516) encrypted content.

Because JWE stands for JSON Web Encryption, even the support team from the sponsor thought that it would be easy to find examples on how to create one of these encrypted text in google. They were far from correct. Many of the hackathon teams (including mine), struggled for hours dealing with something that was secondary to our actual hacks. But anyways, to make it short, it was really frustrating.

I found [node-jose](https://github.com/cisco/node-jose), an npm package by cisco. JOSE stands out for "JSON Object Signing and Encryption", and it basically does what we needed. There was no examples or tutorials other than the one at the readme.md, so I thought it will be nice to play around with [runkit](http://runkit.com/) and create a *js notebook* of a step-by-step code to add a private-key to a keystore, encrypt some content, and then unencrypt it using the same key.

Anyways, [here you go](https://runkit.com/54chi/jose-test-json-object-signing-and-encryption)

