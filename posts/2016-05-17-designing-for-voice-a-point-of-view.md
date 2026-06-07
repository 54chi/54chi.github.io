---
title: "Designing for Voice: A Point of View"
date: 2016-05-17
tags: [blog]
---

#### Overview

Voice is one of the primary ways of human communication, and predates all others. Voice is natural, and, together with the spoken language, it could be a powerful and convenient way to control systems and apps, no matter how complex they could be.

Now that voice/speech recognition (SR) technology has reached the point where it can actually understand different types of languages and dialects, with very little margin of error, more and more applications are coming out that take advantage of the spoken language as a way to interact with them.

They are not perfect though: Most of these SR software are still at their infancy and will still fail from time to time at understanding the human language. This is more critical with languages where pronunciation rules don't follow an established set of rules (e.g. English), and requires a huge list of exceptions. Add to this all the foreign words added to our day-to-day vocabulary, slang words, context words, phrasal verbs, etc. etc. and you'll end up in a big mess.

Through good UX, we can try to minimize this "big mess". Here is a point of view about it.

#### Nielsen's 10 General Principles for Interaction Design

Let's start by reviewing the [venerable list](https://www.nngroup.com/articles/ten-usability-heuristics/) of Heuristics for User Interfaces that Jakob Nielsen defined more than twenty years ago:

###### 1\. Visibility of System Status:

"The system should always keep users informed about what is going on, through appropriate feedback within reasonable time."

###### 2\. Match Between System and the Real World:

"The system should speak the users' language, with words, phrases and concepts familiar to the user, rather than system-oriented terms. Follow real-world conventions, making information appear in a natural and logical order."

###### 3\. User Control and Freedom

"Users often choose system functions by mistake and will need a clearly marked "emergency exit" to leave the unwanted state without having to go through an extended dialogue. Support undo and redo."

###### 4\. Consistency and Standards

"Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions."

###### 5\. Error Prevention

"Even better than good error messages is a careful design which prevents a problem from occurring in the first place. Either eliminate error-prone conditions or check for them and present users with a confirmation option before they commit to the action."

###### 6\. Recognition Rather than Recall

"Minimize the user's memory load by making objects, actions, and options visible. The user should not have to remember information from one part of the dialogue to another. Instructions for use of the system should be visible or easily retrievable whenever appropriate."

###### 7\. Flexibility and Efficiency of Use

"Accelerators -- unseen by the novice user -- may often speed up the interaction for the expert user such that the system can cater to both inexperienced and experienced users. Allow users to tailor frequent actions."

###### 8\. Aesthetic and Minimalist Design

"Dialogues should not contain information which is irrelevant or rarely needed. Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility."

###### 9\. Help Users recognize, diagnose, and recover from errors

"Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution."

###### 10\. Help and documentation

"Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation. Any such information should be easy to search, focused on the user's task, list concrete steps to be carried out, and not be too large."

#### Information Architecture (IA) for voice design

Nielsen's principles still applies to voice design, although the lack of a visual interface presents new challenges. Here are some guidelines that Microsoft and Amazon recommend to help aid in smoothing this new paradigm:

1.  Make it clear that the user needs to respond
2.  Don't assume users know what to do
3.  Clearly present the options
4.  Keep it brief, presenting the information in consumable pieces
5.  Avoid overwhelming users with too many choices
6.  Offer help for complex skills
7.  Ask only necessary questions to reduce friction to the user experience and make the experience seem less thoughtful.
8.  Avoid dialog that creates too many confirmations, with the exceptions of actions of high consequences (e.g. posting messages, buying stuff, changing user's information, etc.)
9.  Keep it simple, but be thoughtful: Users may not always give all of the information required in one step. If information cannot be assumed, ask the user for the missing information step-by-step.
10.  Make sure users always know where they are in your application, and make sure any action that can be taken by a speech command is non-destructive or easily undoable.
11.  Write for the Ear, not the Eye:
     -   Words tend to use different vowel sounds when spoken by persons of different accents.
12.  Test your voice application with users of different accents.
13.  Avoid Technical and Legal Jargon
14.  Be aware that some voice commands may be reserved for system use only.

#### Voice Strengths and Weaknesses

###### Strengths

-   Voice input is a natural way to communicate our intents, reducing cognitive load, as it is more intuitive, easier to learn and to remember than many alternatives.
-   Voice is especially good at interface traversals because it can help users cut through multiple steps of an interface, reducing time and improving the emotional effect on the user experience's perception.
-   Using voice is also a convenient input method when we have our arms full or are multi-tasking. On devices where typing on a keyboard is difficult, voice dictation and spoken feedback can be an efficient alternative way to input..
-   Finally, voice is more socially accepted and should fit within societal norms in terms of behavior (vs. using something like glasses). This will depend on the context of course (see "weaknesses" below).

###### Weaknesses

-   Fine-grained control could be difficult (for example a user might say "louder," but can't say how much)
-   Voice can also be imperfect. Sometimes a voice system incorrectly hears a command or fails to hear a command. Recovering from such an errors is a challenge in any interface.
-   Lastly, voice may not be socially acceptable in public places. There are some things that users can't or shouldn't say. These cliffs allow speech to be used for what it is best at.

#### Using text-to-speech

Because English pronunciation rules are difficult for most voice assistants, and most of them don't support all the SSML options, consider following these recommendations when designing your speeches:

1.  Rely on the Text, Not Stress and Intonation (Prosody)
2.  Clarify Specialized Abbreviations and Symbols
3.  Use SSML to Specify the Right Variants When Necessary
4.  Write Text-to-Speech in US English or Using US English Phonemes
5.  Test the Text-to-Speech Results and Revise as Needed

#### Conclusion

Voice assistants have improved a lot. But they are still far from gimmicks in our devices. I still remember [this article](http://techcrunch.com/2012/08/23/siri-is-the-new-clippy/) where Siri was compared to the annoying MS Clippy and I still have to find a person that can't live without Siri, Cortana or Google Now. But as our devices become smarter and ubiquitous, and interfaces become invisible, the appeal of voice as an alternative to interact with them increases. Just recently for example [Viv](http://techcrunch.com/2016/05/09/heres-what-viv-looks-like-the-next-generation-ai-assistant-built-by-siri-creator/) was demoed, and Google is [apparently building an alternative](http://www.theverge.com/2016/3/24/11298426/google-building-amazon-echo-rival) to Amazon's Echo.

In fact, to call the devices we have now "smart" seems laughable when compared to a not-so-distant future (and you know it is coming) where the technology just recedes into the background and takes care of things without even asking. You don’t really want to be stuck engaging them. You want to be free.

All the major players out there: Siri, Google Now, Cortana, Alexa, Watson, Nuance, etc. have their own shortages, whether they are using AI, voice training, whatever. They'll eventually become better for sure, but there is no need to wait: good UX design is here to the rescue.

This **User Experience Design** (Voice Design?) is not about making "low resolution screens" or creating "style guides". Instead, this is about learning who are the users, what are their needs and limitations, and defining the way they'll interact with your apps (and anticipating their actions) so they don't get blocked and instead have the best experience possible will be key.

Are you ready?

#### References

-   Fast Co's most important [design principles](http://www.fastcodesign.com/3056701/the-most-important-design-principles-of-voice-ux) of Voice UX
-   A List Apart's \[Designing the Conversational UI\] ([http://alistapart.com/article/designing-the-conversational-ui](http://alistapart.com/article/designing-the-conversational-ui))
-   Microsoft's Hololens [voice design](https://developer.microsoft.com/en-us/windows/holographic/voice_design) article
-   Amazon's [best practices](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-voice-design-best-practices) for Alexa Skills
-   Nielsen's [10 Heuristics for UI design](https://www.nngroup.com/articles/ten-usability-heuristics/).
-   Also please [check the link](https://medium.com/rain-drops/usability-heuristics-meet-voice-experience-design-7aaead3d77b0#.9nvop3222) if you want to have a more direct implementation of Nielsen's rules to Amazon's Alexa.
