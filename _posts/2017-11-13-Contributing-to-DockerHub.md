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

I mean, most images out there do very well by themselves and if I needed something else, I could just spawn my own docker containers from a file (or a files) in my local pc, repo or something (the trusty dockerfile).

That changed this week.

You see, I am using asciidoctor more and more these days, so more people at work have started to get involved. But not many of them have the knowledge or patience to figure out how to get started from a dockerfile, and would prefer to run it from a nice GUI like kitematic or what not. It also help keep things feel more standardized too, since you reduce the risk of some rogue agent adding his/her own custom "one more thing" to his/her dockerfile.

The official [asciidoctor image](https://hub.docker.com/r/asciidoctor/docker-asciidoctor/) is pretty good already, but for us it was missing a couple features that we needed in our workflow:
- Node.js and
- The compass builder for stylesheets

The github repo for the dockerfile is [here](https://github.com/54chi/DockerfileAsciidoc/blob/master/Dockerfile), and the ready to use image is available [at Docker Hub here](https://hub.docker.com/r/numero2/num2_asciidoc/)

Thanks to this, I learned a simple method to upload docker images. For anyone curious, here it is:

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

PS. Docker hub needs the whole image to be uploaded, not just the dockerfile file.
