---
layout: post
title: "Contributing to Docker Hub"
author: "54chi"
date: 2017-11-13 20:10:33
tags:
- docker
- dockerhub
- asciidoc
---
I always thought that adding stuff to [Docker Hub](https://hub.docker.com/) was something that I'll never do. 

I mean, most images out there do very well by themselves and me and my team will be ok to spawn our own docker containers from a file inside a repo or something.

That changed this week.

You see, I am using asciidoctor more and more these days, and luckily more people at work are getting involved. Sadly, not many of them have the knowledge or patience to figure out how to get started from a dockerfile, and would prefer to run it from a nice GUI like kitematic or what not.

Since the official [asciidoctor image](https://hub.docker.com/r/asciidoctor/docker-asciidoctor/) was missing a key feature for us (the compass builder for stylesheets and node.js), I made  anew dockerfile and published in docker hub.

It is available [here](https://hub.docker.com/r/numero2/num2_asciidoc/)

I also learned a way to upload docker images. It turned to be really simple:

1. Login into [Docker Hub](https://hub.docker.com/) and create a new repository. You can create an *org* to use as your namespace if you prefer to.  
1. Enter a short description, long description and select visibility. Click on create.
1. You'll end up with a docker hub repo name (e.g. `numero2/num2_asciidoc`)
1. Back in your PC, open a terminal window
1. Get the list of docker images (`docker images`)
1. Find the image repository name (e.g. `my_asciidoc`) and tag (e.g. `latest`) that host the docker image you want to upload 
1. If the image name is different than the one you want in Docker hub, add a tag as needed (e.g. `docker tag my_asciidoc:latest numero2/num_asciidoc:latest`)
1. Still in terminal, login with your docker credentials (`docker login`)
1. Push the image to docker hub (`docker push numero2/num2_asciidoc`)

After a few minutes (depending on your internet speed and image size), you'll have your image uploaded for anyone else to use :)

I originally expected that all that dockerhub needed was the dockerfile file, but apparently that was not the case and they needed the whole image to be uploaded. That's a bummer, because I have a few dockefiles from previous projects that I may want to upload into the "numero2" org but don't have their images anymore (which will take some time to build and I'm lazy). 

Perhaps sometime in the future.
