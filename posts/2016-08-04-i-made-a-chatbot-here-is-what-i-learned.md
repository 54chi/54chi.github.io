---
title: "I made a chatbot. Here is a braindump of what I know so far"
date: 2016-08-04
tags: [blog]
---

A few days ago, the Ford SmartJourney hackathon came to an end. The topic was how to solve the Mexico DF transportation problems: too many cars on the road, slow mass transportation, informal bus routes, high pollution, etc.

I made a chatbot.

I'll talk about the whole solution eventually, but in the meantime, here is what I learnt about chatbots (as of 2016):

1.  Chatbots are not new stuff. They have been in one for or another since late 60s (Eliza was made in 1966 -- she is 50 years old!!)
2.  Facebook messenger and Whatsapp (owned by Facebook) are the top public messaging systems in the US, but Facebook only announced its bot platform a couple months ago. Slack (used by many companies), Wechat (popular in China) and LINE (popular in Japan) have been supporting bots for a while now.
3.  Microsoft also announced its bot platform, with strong emphasis in NLP and AI. To prove its technology, they've released Xiaoice (for Weibo/Wechat) in China, Rinna (for LINE/Twitter) in Japan, and the infamous Tay (for Twitter) in the US. The tehcnology behind these bots is impresive, and even though it considers millions of conversation possibilities, is still not perfect.
4.  The barrier to create a chatbot is pretty low, and will become even easier as their popularity increases
5.  However, the majority of the bots are pretty ignorant, and will still require coding for more complex stuff (e.g. calling webhooks to get the weather report)
6.  The most complex thing (according to me) is still around understanding the user's intent (what he or she wants to do): here are a couple ways to address this issue:  
    -   NLP (natural language programming) combined with AI: the idea behind this is that the bot can keep up with human conversation naturally and learn by interacting with its user. E.g. wit.ai, api.ai, etc. It's the one with the most potential to grow.
    -   "Choose-your-adventure" type (I'm sure there is a better name for this), where a list of options is presented for the user to choose. It is less flexible, but may have a greater success rate since the bot forces the user to select an action in a specific way. Most bot software supports this.
    -   Keep in mind that none of the above options is perfect. NLP is too complex and inaccurate to become usable (just look into Siri, Cortana and Google Now...). And having a set of few options ("choose your adventure" type) is limiting and will frustrate the user when they try an option that was not pre-programmed. The goo news is that there is a third, better way: Hybrid mode, where human assistants also participate in the answers. It's not the cheapest, but it certainly saves cost. I expect many of the first wave of popular bots will go this route instead of the first two.
7.  There will be a rise of job opportunities for two new roles:  
    -   Conversation Experience designers (aka: designers for voice) that will really need to understand how MOST users will interact with the app
    -   Language scientists that can take the few flows discovered by the conversation designers and expand it to support all the possible variations, either by intent matching, pattern recognition, NLP, etc.
8.  At least for Facebook messenger (and a few others), there doesn't seem to be an approval process. The messenger will be tied with a Facebook page, but that's it. What this means is that currently is possible to upload broken code or even malign code. Expect a lot more spam bots and clones in the future with similar names to the most popular ones.
9.  Since the majority of the bots are cloud based, the conversation history could be stored in the messenger providers and anything in between (e.g. a database, a text file, an email...). That'll be the FBI's dream come true, but a nightmare for anyone concerned for their privacy. Make sure to check the ToS, or at least convince your infosec guy that the bot means no harm :p
10.  There are plenty of success stories around the messenger ecosystems in Asia (just google WeChat or LINE), and nobody denies the potential; but there is no killing messenger app in the US yet
11.  Messenger app stores out there are very crappy, and have not reached a critical mass in the states (yet).
12.  Creating a bot for one type of messenger and then porting it to support another type of messenger is trivial (easier than porting an app from android to ios, for example). There are a few products out there to make it even easier (e.g. smooch.io and meya.ai), and is probably a good idea to invest researching them, as the bot market will keep maturing and become more and more popular.

This was a continuation of my ["design for voice"](../designing-for-voice-a-point-of-view/index.html) post, which help me design my chatbot interface.

And also my Alexa skill ;)
