---
title: "IoT? Project: Tap 2 Tip with NFC"
date: 2016-06-14
tags: [projects]
---

So, this is an idea that I had in my brain since 2015 (feels so far away). This weekend, while participating at the Toronto Angelhack, I finally made it.

#### What is it

An NFC tag that is read through a mobile device app. Complementary bells and whistles are:  
\* Social media ratings \* Mobile payments

#### The problem

You are coming out of the subway and see this awesome street magician, doing his thing at the station's platform. You want to tip him, but you don't carry change. All you have are your credit cards and your phone. The guy is awesome, but you can't do anything. So, feeling guilty, you continue your way home.

#### A solution

What if there was a way to tip them using your phone?  
The street musician can carry an inexpensive NFC tag that modern phone's NFC reader can read through an app. You can use that app to not only tip the busker, but also rate him/her, so others can learn about his awesomeness.

#### Project Details

-   Using Cordova, use most phones' NFC support to read and parse an NFC tag information.
-   Using Ionic, leverage an AngularJS app to create the needed UX flow.
-   Read to Amazon DynamoDB buskers' profile, and "write" ratings and tipping operations.
-   Use Amazon's lambda to create secured functions to connect to Dynamo.
-   Finally, connect all these via Amazon's API Gateway.
-   For this stage, payments are done via Paypal, but this can evolve to a "piggy bank"-type of approach, where our servers hold money.

Overall, this is a Serverless + Mobile App architecture that is extremely cheap to maintain and super scalable.

#### Demo Video

#### $$$

The primary way of income will be a % on the tipping transaction (5%). We want to keep the donations small, to both encourage multiple donations and limit fraud. We also charge a fixed $ amount per tag (~$5) that could also be customized to look like a more traditional ID if needed.

And then, there is the data collected: ideally, from time to time some big shot in the media market will notice that there is an outstanding busker in his/her community. and would like to interview (or even sponsor) him/her to make some good PR, and in the process help someone in need. Think "Britain's Got Talent", "The Voice" or even "Ellen". Tap to tip will probably won't make too much money, but will definitely get a lot of free publicity.

Granted, this is not an app that will make you millionaire in a day, but it can definitely help a lot of people.

#### Challenges

-   This is all about adoption. You can't promote something like this via Kickstarter or QVC. You need someone big and a lot of promotion to start the ball rolling. The good news is that most humans try to be good, and the idea of helping someone in need (sp. if it can be tax deductible) has a lot of potential. A lot.
    
-   iPhones don't support NFC readings for anything but apple pay. There are rumors that the next WWDC conference will announce additional NFC support, but that is still TBD. We can build temp. workarounds, like QR codes and what not, but they are less secure than NFC tags by default. Hopefully WWDC 2017 will announce something cool!
    

#### Notes

As complete as this project may look, the busking community is still a test bed. The concepts here can easily be extended to other types of tip-based economies, like restaurants, hotels, uber drivers and even homeless people on the streets. The curious thing here is that the limitations are not on the technology, but the legal aspects of it >\_<
