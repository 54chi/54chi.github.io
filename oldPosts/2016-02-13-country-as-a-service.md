---
title: "Country as a Service"
date: 2016-02-13
tags: [blog]
---

In Today's current state of technology, it is obvious that the demand for better User Experience brings a lot of benefit for both the consumer and the producer.

When it comes to governments (regardless of the country), this experience is broken: several websites with different conventions between them; inconsistent UI; government terminologies; downtime; transparency of data; etc.

Their websites, apps and supporting tools were made with customized technologies at different points of time, making it very hard and expensive to update, typically under utilizing very costly licenses and service providers because of their specific needs.

A time to move towards a more user friendly and "as a service" approach has started in many countries, where common/modularized components are created to mix and match government needs, while at the same time improving on the usability and transparency of their data.

A very famous example is the [UK's](https://www.gov.uk/) government website, a huge 2013 redesign project that put together several websites into one common umbrella. Regardless of [the results](http://www.theregister.co.uk/2015/02/18/the_inside_story_of_govuk/), the obvious take away is that **government websites should be driven by needs, not visuals**. Get in, get what they want and then get out. Nobody cares for fancy pictures or typography.

Here is a video by [Mark Fodden](https://markfoden.com/) that explains all this better:

So, putting the roadmap together, here is a way to accomplish this, from the technology point of view:

1.  A huge migration and upgrade plan needs to be laid out, with as many details as possible. Involve the best SMEs you can find and identify synergies and improvements. Not everything will need to be updated: for sure there are many systems that nobody uses anymore, or that are due for replacement. Just keep in mind the purpose of what you are trying to accomplish (e.g. the old: "ask why" three times) and that is always better to simplify things, but without removing core functionality.
    
2.  You'll need servers. Tons of them. You can opt for a government cloud services (you shouldn't use commercial cloud services for gov stuff after all); your own server farm (distributed and redundant to minimize risk), or a hybrid approach, where some infrastructure remains on premise.
    
3.  Data needs to migrate: ETLs, and kept in sync between your applications and layers: ESB. You'll also need an API foundation with different levels of security (microservices) and communication supports. Having a good API definition is key, as it will allow you to roll out different pieces of your software as they get completed/migrated without breaking the overall experience. Ideally, this should end up as a standard, so new services that come up later will be easier to understand and upgrade.
    
4.  As you do this, you should be able to identify duplication of data, so this is a good opportunity to finally create those common Master databases for information that is shared across the government. Take particular attention to any security and privacy concerns, and expose only what is needed to the other systems. Be open of what kind of attributes are available to prevent future duplication again, but don't reveal how it is encrypted and secured of course ;) Also keep in mind that these databases will be used constantly, so performance and reliability will be key.
    
5.  It may not look very important at first, but common style guides should be shared across all gov websites. Maybe have a version for the "internet" and another for the "intranet", and some variations based on region, but keep the country's brand as one. This will benefit the citizens, as they don't need to relearn where to click and what not.
    
6.  Similar to the style guide, use Information Architecture practices to organize, prioritize and simplify how your citizens use your websites. If there is a large budget, and your servers can afford it, consider adding personalization options, so each citizen gets a targeted content. Also, you may want to have notifications and alerts across multiple sites (e.g. emergencies, jury duty, where to vote, tax return status, etc.).
    
7.  All critical services offered needs to be written to support high traffic and fast recovery in case of emergencies. E.g. offline support, static content version with key information, t.v./radio announcements, etc. Also, alert systems should be prepared to "push" content out: on the websites, emails, sms, etc. These are usually targeted to a specific region, so keep that into account.
    
8.  Forms, payment gateways, communication, search tools and similar services can be generalized and shared across the gov sites. Without doing a lot of research, I can infer that the majority of the web traffic will happen to ask for information, pay a fee or fill up a form, but do focus groups across different sectors of the population to verify these. For forms and payments, only ask what is needed. As a government, you probably already have access to most data you'll need after all.
    
9.  Analytics to trace behavior and sentiment are key for continuous improvement (not to be confused with continuous integration, which is also a good thing, but may be challenging -but not impossible- to implement at this high level)
    
10.  Cross browser and device support, as well as support for people with disabilities and multi-lingual versions of your websites are important.
     
11.  Be transparent. People tend to think that most governments are corrupt, and maybe right. But by providing transparency to everything you do (with a few exceptions, like security, confidential research or military secrets) and a platform for accountability, your citizens will be better off (and behave better) than when they learn about their former leaders' secret accounts in Panama :)
     
12.  Finally, we can't predict the future. Calling something "future-proof" is naive. So expect change. Embrace it. Change is proof that society is evolving.
     

PS. And yes. This could be used for companies as well.

Work in progress.
