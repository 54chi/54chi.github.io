---
title: "IoT Project: Finding Flight Deals"
date: 2016-05-15
tags: [projects]
---

Ok. I'm officially way off my proposed roadmap: I've done very little re:the PM tool and I've not been traveling anywhere (with the exception of a few short trips here and there).

Instead, I've been participating in hackathons and mini-projects, just to keep my brain in shape and get some fresh ideas. The latest mini-project is very straightforward: publish an Amazon Skill by the end of the month. It was inspired by [this](https://www.hackster.io/challenges/amazon-alexa-skill-contest-one/projects) though I'm sure my idea is too "practical" and not as cool.

The reason why I want a voice app is because I'm also researching **voice-only design** interfaces. Long story short, it's very interesting, because it finally put **real UX** front and center (e.g. understanding the personas, user journeys, improving the experience). I'll blog about this really soon.

#### The problem

You want to travel somewhere, but you don't really care where, as long as it is interesting. The usual suspects: Paris, Rome, Tokyo, etc. are fine, but you would prefer to fly there whenever is the cheapest, or better yet: fly somewhere else that you never considered, like Lima or Auckland if the price is right. Is just that there are so many great cities out there that searching for them every single time takes too much effort.

#### A solution

Using a hands-free interface (e.g. voice), find **Travel Deals** from anywhere to anywhere. The experience is akin to asking a friend or colleague the question: **"I want to go to Asia. Where should I go?"**, vs. having a destination set in mind beforehand.

The target personas are people that can be flexible with the destinations and dates, like whimsical travelers or digital nomads.

Voice is especially good at interface traversals because it can help users cut through multiple steps of an interface. No need to follow "steps" every time you need to get something. Just say what you want.

#### Project Details

Apple's Siri, Google's Now and Microsoft's Cortana are the most popular voice assistants out there, but Amazon's Alexa is the first one you can easily install on an IoT device and is extendable, as long as you can build the support.

The project shows how to create a Lambda function for handling Alexa Skill requests with:

-   Screen scrapper: Using Cheerio, similar to a [previous project](../nodejs-project-oriconcast/index.html).
-   Session State: Handles a multi-turn dialog model.
-   Custom slot type: demonstrates using custom slot types to handle a finite set of known values
-   SSML: Using SSML tags to control how Alexa renders the text-to-speech.
-   Support i18n (for future usage and better message configuration)

You can run the skill with your Amazon Echo, Tap, Dot; your own [IoT hardware](https://github.com/amzn/alexa-avs-raspberry-pi/blob/master/README.md) or smartphone apps like Roger or Lexi.

The full code can be found [here](https://github.com/54chi/alexa-skills/tree/master/hopperDeals).

File structure:

-   index.js is the starter generic file (e.g. the App is called "App" :))
-   /lib contains the Amazon libraries (AlexaSkill.js)
-   /src contains the intents and configured dialogs (via i18n)
-   /test contains the test files (using tape for simplicity)

#### Sample Utterances

```
HopperExplorerIntent for travel deals from {USCity} to {Continent}  
HopperExplorerIntent for travel deals from {USCity}  
HopperExplorerIntent for travel deals to {Continent}  
HopperExplorerIntent from {USCity} to {Continent}  
HopperExplorerIntent from {USCity} to the {Continent} continent  
HopperExplorerIntent new deals from {USCity} to {Continent}  
HopperExplorerIntent what are the cheapest flights from {USCity} to {Continent}  
HopperExplorerIntent show me the best flights from {USCity} to {Continent}  
```

#### Testing the project

Unlike most sample code out there (including Amazon's), to me testing the code was a must, at least to make sure there was some results coming back from the Hopper site. Mimicking the HackerNews skill code, I used [Tape](https://www.npmjs.com/package/tape), and added a few extra tests for the Amazon default skills, like "Yes" and "Repeat", to make sure my implementation doesn't break upon publishing.

To test the code, get all dependencies via npm install and then do:

```
npm test  
```

To test the skill, keep in mind the following considerations:

-   Make sure that the you use a **US City** as the origin. The slot type is the AMAZON.US\_CITY default one after all.
-   Make sure the destination is a **continent**.

Sample flow:

1.  "Alexa, open HopperExplorer"
2.  "new deals from Chicago to Europe" (the skill should return the first page of results)
3.  After the first page is retrieved, you can say:
    1.  "Yes" to retrieve the next page
    2.  "Repeat" to repeat the page results
    3.  "No" to cancel

The skill also accept some variations, like: "HopperExplorer from Atlanta to the Asian continent".

You can also say "Anywhere" as the continent, which will also include US cities in the search results, plus anywhere else in the World.

The default values for the US City is **"Seattle"**, and for the Continent is **"Outside US"** (which is anywhere in the world except US)

#### To do

-   Save the point of origin in a Database.
-   Extend the USCIty slot to include other cities around the World.
-   Save the users' emails and send the results via e-mail. In the meantime, the result could be seen in the Alexa App's cards.

#### Notes

For educational purposes only. All data stored and retrieved will never be sold nor used for anything really. Analytics may be captured on the Hopper site, but they will be for the Alexa skill, not individual users.

Keep in mind that Hopper deals are basically crowd-sourced, so it can't guarantee you the best deal ever, though it will consistently recommend you better deals than average travel sites (IMHO). If there is demand/need for it, I'll upgrade the email link to redirect you to a booking site (e.g. skyscanner's or google's), but for now it's up to you to go check the deals yourself.

Alexa skill for cities is currently constrained to US only. I may add my own list later, but I need to build the different ways to call for cities, e.g. "Mexico D.F" vs "Mexico City", all those "Saint" vs "St.", dashes, commas, apostrophes, etc. etc.

PS. The skill secretly supports cities as destinations, but the results are not as good (e.g. 10 results for the same airlines, with the same price but different days, which is not what I wanted, user-experience wise).

PS2. Kayak just published its own official skill.

For reporting bugs or suggestions, please email 54chiMaster@gmail.com

#### Credits

The Alexa Skill code is a compilation of the following projectS:  
\- Miguel Mota's Hacker News skill, for the screen scrapping - Toy Hammered's dailyCutiemals, for the email functionality (which I may use eventually, at least to store the point of origin)

The list of airports/city from [http://codepen.io/mochiron/pen/ONGjwz](http://codepen.io/mochiron/pen/ONGjwz) and modified with continents list.

Everything else is based from the NPM packages documentation.
