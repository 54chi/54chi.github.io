---
title: "Onboarding 101: How to Find Your Navigation Officer"
date: 2016-04-24
tags: [blog]
---

Once your software company is mature enough, you'll most likely require more personnel. You are out of the prototype stage and now you need to focus on building a serious looking, high quality product to be delivered six months from now.

Because you are going to be busy with the promotion and investment rounds, you ask your cousin Gary to help you with the development. Gary is the go-to techie person in your family. Every time someone gets a PC virus or needed advice on what smartphone to buy, they call Gary. So you made him the CTO of your company and assign him some high level tasks. No time to explain any details. He can ask if he has doubts.

Even though you got cash from the first Series A round, you told Gary to keep it cheap. "MVP" you call it. After extending the contract to the developers that did the prototype, Gary posted some job openings in freelance.com and elance.com, and hired a bunch of people based on their experience/hourly rate ratio.

What could go wrong?

Let's make an analogy between a cargo ship and a software products (hopefully I don't make it too confusing):

Imagine the following:

-   The ship's cargo is the product being developed
-   The ship is the infrastructure/software/technology on top of which the product is being built
-   The ship crew is the delivery team
-   Each container is a business requirement
-   The captain is the enterpreneur/owner, in charge of taking the cargo to its final destination port
-   The navigation officer is the CTO/Technical Delivery Manager
-   The navigation route is the project delivery plan

You are the captain.

After stopping at a port along the route (aka: a stakeholder demo or deliverable in the plan), your ship is delayed due to some of the containers needing some repairs (e.g. scope change or delivery team problems).

To save time and avoid complex math calculations, your navigator recommended to fill up the tanks to the top, and tug a small boat filled with extra fuel, just in case (aka: capacity/performance planning). Oceans can be a pain in the butt sometimes, so better safe than sorry, you think. Worry not, the customer's money is plenty. And with all that extra fuel, your ship can go at top speed, saving time.

Except that you don't really saved time.

Procuring the additional boat and preparing it for the tug took another week.

So, weeks later, your ship finally departs. In the end, you didn't buy the additional boat (too much paperwork and you don't have the time to read all the small print), so you left it behind for the next time you may pass through that port (this would be the equivalent of irrelevant training, licenses, trips, etc. that affect your project plan)

To compensate, you ask the navigator to hire the cheapest crew members he can finds, plus some second handed oars. Anyone can row, right? (aka: code monkeys)

Now on route, you start to worry about the delay, so you call your navigation officer again. The ocean is pretty much a large open space, and maybe you can aim to the destination in a straight line, he tells you. You agreed, and the ship changes course (cutting corners in the project plan).

The straight line approach is way faster than predicted. Now you think you can get at your destination 3 days before due. You decided it's time to relax a little bit, and check on the crew, who has been doing nothing but rowing exercises (aka: senior devs training junior devs).

There was a small reef a few hours ahead your route, but you expected your navigator will fix the course on time (e.g. non-functional requirements). Plus the ship is huge. What can a reef possibly do?

So you throw a big party, and invite everybody to it.

The party went for a few minutes too long.

Your ship hit the barrier reef.

It's not too bad, you think. If you think about it, your ship has been falling apart for days now (e.g. technical limitations of the infrastructure, team burnout, cost overrun, etc.). Most containers were not properly secured, so some of them already dropped into the sea. By the time the customer finish checking all the containers, you'll be long gone. Plus you can always blame some tropical storm or whatever. Also, most cargo is insured, right?

You expect the crew will be able to make the ship out of the reef by using the oars. However, the weight of the cargo and the force of the oars against the reef made an irreparable crack in the hull. The ship starts to sink.

There was no way to save the ship now. You have no choice but to call for help.

But wait! There is more:

Realizing that going across the barrier was illegal, you and your navigator have been sending false reports to your customer, saying you were at a different location and that everything was perfect.

The accident made the news. Your employer, one of the biggest shipping companies in the World got into a lot of trouble and lost other shipment contracts because of this.

Both you and your navigator went to jail.

And the crew? Experts at rowing now, most of them flee on top of a few floating containers to the next island, where they looked for a new captain.

* * *

If you think that the above is too far-fetched, think again:

On Wednesday, 5 October 2011 (the same day when Steve Jobs passed away), the container ship Rena ran aground on the Astrolabe Reef in New Zealand, which eventually resulted in what was described as New Zealand's worst maritime environmental disaster.

The Rena could carry the equivalent of 3300 20-foot containers. It had been bought by a Greek firm who hired inexperienced Philippino seamen to crew it and then leased it to an Italian firm.

In July 2011 the Rena was detained at Fremantle, Western Australia after the Australian Maritime Safety Authority found the vessel had not been maintained between surveys. The hatchway cover latches were cracked and rusted, and containers were not secured properly.

Later in September, it was found that its safety checklist was not working effectively, and consequently equipment failures were not being picked up. This included their GPS screen, which was not capable to show small details (like reefs) when zoomed out.

The day the accident happened, it was the captain's 44th birthday. It is assumed that there was alcohol involved in the accident.

On 25 May 2012, the captain and navigation officer of the Rena appeared in Tauranga District Court for sentencing. Each was sentenced to 7 months imprisonment, after pleading guilty to 11 charges between them, including attempting to pervert the course of justice (based on alleged alteration of navigational documents after the collision).

The accident was totally avoidable.

* * *

Ok.

Let's go back to the software product thingy talk.

Of course I know that you are not like the captain of the story (if you are, maybe you should consider switching jobs ASAP), but what about the navigator? Having a proper navigation officer would have made the difference. Even with the rundown ship, if he only recommended not changing routes, or at least being more aware of the reefs, this would have never happened. If he was experienced, he could have told you how to manage the delays, and maybe suggest you to leave some of the empty containers in the last port (so your ship can go faster with less fuel), or replace them with other containers that you can sell for more back at the destination port to compensate for the delays.

But I digress. What can we do to onboard a good technical manager?

Let's start with the definition of what a technical lead should be.

For that, I like [this article](http://www.infoq.com/articles/technical-leadership-overseen) from InfoQ. To resume, your tech right hand will most likely need the following hats:

-   Be able to support the delivery team: motivate, facilitate, organize team work process
-   Has technical excellence: enforce and monitor technical practices, organize technical experience and information from/to customers
-   Bring innovation to the table: sponsor innovation, organize acquired knowledge

But how technical does he has or she has to be if they are not writing code day to day? They will definitely need to be able to understand what needs to be done and bring ideas when the team gets stuck. But how can you make sure of that during a one hour interview?

Here is a cheatsheet:

I'm taking this from [kate{mats}](http://katemats.com/) almost verbatim.

### Step 1: Stage the ambiguous BIG idea

Pick a big software system with relatively clear functionality and has the potential to grow in terms of traffic, usage, items, data, etc.. E.g.

-   A travel booking website (like Kayak)
-   A streaming music service (like Spotify)
-   A payment gateway (like Paypal)

### Step 2: Ask them to define it

Ask them to define and articulate the requirements. This is a great way to get a sense of their general product know-how, and intuition on product design and implementation.

> Image you were tasked with managing the creation of an API for a travel booking website like Kayak, or Expedia. What are the high-level use cases and requirements for such a service?

As they answer pay attention to how the approach the problem: Do they start with the customer first? What kind of questions do they ask up front? What parameters do they specify? Do they think about security or external/internal consumption of APIs? Feel free to ask probing questions and give suggestions until you are happy with the result.

So for the travel booking example, their answers might be something like the following:

-   Search trip
-   Get trip result details
-   Book a trip
-   Modify a trip
-   Cancel a trip

Depending on the requirements of the position, you may ask them to define some high level API request/responses for these use cases.

### Step 3: How does the system actually works?

Using their interfaces from Step 2, ask the candidate to actually draw out the logical pieces of the system needed to support these requests (make sure you have a whiteboard available). You should cover the following things:

-   How are requests services?
-   Where is the data is stored?
-   What needs to be backed up and when?
-   How do these different pieces interact together? What are the services needed to support the system?

### Step 4: Scaling

With their diagram ask them about scaling and growth.

-   Where are the current bottlenecks?
-   How would things need to change to support 1000x of the amount of traffic?
-   How could you support more customers? Would you need more security and authentication?
-   What are some different partitioning schemes?

Let them update the diagram accordingly, and explain the reasoning behind those changes to you.

Asking these questions will give you a good feel for the candidate’s knowledge and ability to diagnose and understand potential bottlenecks and issues as the services grows (which hopefully your company is doing!). It can also be a good indicator if the candidate really understands the system architecture and the way the pieces go together and support one another.

### Step 5: Building

Once you’re confident that they’ve done a great job with the architecture then it is time to move on to an important skill any software manager needs to nail – how to build a system. I like the follow up with something like the following:

> Imagine you’re tasked with actually building this system.

-   How would you staff the team?
-   What technologies would you use and why?
-   Which parts would you build first and in what order?
-   How long do you think it would take to get a basic version shipped?
-   How did you determine that estimate?

What you are really looking is to dive into their thought process and philosophy around resourcing and staffing projects. You want to understand the way they structure and think about software and the build out of a complex system.

A great follow-up is to ask the candidate is what is the fastest they could build and launch it? How much time would it take? How many people would they need to make this happen? What are the greatest areas of risk?

This line of questions can provide a picture of how pragmatic and realistic the candidate can be, and perhaps some of their creative resourcing ideas. Hopefully they will pepper their answer with anecdotes from their past experience, and if not you can always prompt them and ask, "Have you ever tried that before? How did it go?" or "How to ensure your team hits deadlines and ships software on time?"

### Step 6: Deployment and releases

It is time to get a feel for how they would actually handle the deployment and launch of such a system built from scratch. There are two sections to this step: the infrastructure and the process.

#### Step 6a: The Infrastructure

How well your candidate understands hardware, storage, and general costs of operating and maintaining a large software website?. Some good questions:

-   What is the minimum amount of hardware needed to operate this system?
-   As you scale where would you add hardware first?
-   What is the incremental cost at each step?
-   Are there optimizations you could make to reduce your hardware spend? (good answers are things like compression, archival/cold storage, etc)

You are looking to get a feel for the candidate’s sense of cost and spend for hardware and hosting (which hopefully is something they have managed or dealt with at some point in their career – even if it was just their own personal website).

#### Step 6b: The Deployment

Now that both of you have explored the way the software might reside and operate in the physical environment a great follow up is how they would actually update or deploy the software. Fair questions are things like:

-   What kind of tools do you use?
-   How would you roll out to new users? (good answers are typically staged roll outs, betas, feature flags, etc.)
-   How do you balance the “splashiness” of a big marketing launch (and peak traffic) with a brand new system?
-   How can you mitigate risks to ensure a successful launch?

Hopefully they have some good ideas and can pull from some past experiences (including mistakes where launches went terribly bad – since most of us have experience with those).

### Step 7: Operations

Understanding the operations is an important thing to assess in the interview. You should be sure to touch on philosophies on operations and support, but also make sure they understand best practices. Here are some questions to help you probe these areas:

-   What types of monitoring do you need for this system?
-   How often would you look at your instrumentation?
-   How many people do you think are needed to maintain and operate this system?
-   How have you handled operational issues in the past? Did it work well? Would you change it if you could? How did the team feel about it?
-   What kind of process or feedback loop should be in place for customer feedback/issues?
-   What kind of business metrics do you want to measure or track for this project?
-   How have you tracked these types of business metrics in the past? Did it work well? Why or why not?

With each area of these questions you are trying to get a grasp of the candidate’s experience and thoughts with the various aspects of running a production system. Hopefully they will provide great answers that align with your company culture and resonate with you and your team.

You can pick and choose each step based on your team’s needs and the responsibilities of the position. You can also add more steps too – things like hiring and recruiting talent, documentation, managing biz dev partnerships and APIs, etc. You get the idea.

* * *

There are more useful interviewing questions ak Kate's site. Here is another [another example](http://katemats.com/how-to-create-interview-questions-that-work/) and [another one](http://katemats.com/interview-questions-for-software-development-managers-and-leaders/)

Now, get out there and make sure you hire a kick-ass Navigation Officer.
