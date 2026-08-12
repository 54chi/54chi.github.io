---
title: "NodeJS project: oriconCast"
date: 2016-02-19
tags: [projects]
---

The 3rd project of the year got a slight change of scope.

##### The Problem

APIs are beautiful solutions to get things inter-connected. They can provide content in a secured and custom way.

Assuming there is an API available.

When they are not, your options are limited (e.g. FTP a file, direct Database access, manual input, etc.)

But since everything is on the web these days, there are other alternatives.

##### A Solution

Screen scrapping and crawling, which basically means open a website and navigate its links in an automated way. While doing so, retrieve the data you need (e.g. in a json file or database) that can then be used for your own needs (e.g. your own API).

Originally, the plan was to create an automated podcast generation code. The flow was going to be like this:

1.  Open Oricon chart's top Indie tracks
2.  Create a json file with the results
3.  Open youtube and download a video for each song
4.  Extract the audio from the videos
5.  Combine them all into one big mp3 file ready to be uploaded as a podcast

Step #3 was a pain. Most videos were non-existent or "covers" made by fans. I even tried other sources besides youtube with similar results. Plus I was getting concerned of copyrights and stuff.

So, I was checking youtube videos aimlessly and found "Top 5" type of videos and thought to myself I can probably automate that stuff.

The new flow is like this:

1.  Open kickstarter's top technology campaign pages
2.  Create a json file with the results
3.  Download the campaign videos
4.  Create "covers" for each video (aka: campaign's title)
5.  Resize the videos accordingly (in this case, they are all 640x360 pixels)
6.  Combine them all into one big mp4 file ready to be uploaded to youtube

The process is fully automated, and it takes a few minutes to compelte (mostly because of the downloads and rescaling).

This ended up being more complex than the original project, which I like.

Sample result:

The code can be found [here](https://github.com/54chi/oriconCast)

Tools used:

-   [x-ray](https://github.com/lapwinglabs/x-ray)
-   [download](https://github.com/kevva/download)
-   [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)

Future changes (upcoming months)

-   Command line parameters
-   Uploading to youtube
