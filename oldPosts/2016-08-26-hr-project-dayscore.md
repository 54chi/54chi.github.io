---
title: "HR Project: Dayscore"
date: 2016-08-26
tags: [projects]
---

#### The Problem

As a manager or leader for Technology projects, we have a plethora of tools and techniques that can be applied to manage our teams and projects better and we are encouraged by our supervisors to be as productive as possible.

Somewhere down the path, it all turned about having some tasks defined, estimated, developed, accepted and deployed following some guidelines. The dev team mutated into coding machines whose well-being, creativity and professional growth became useless. We were not measured against those factors after all.

But the machines had hearts and brains. And souls. And they were not content. We'll ask them to sit for hours in meetings that didn't add any value to what they were doing so they can assist us in case somebody from the client side ask us a technical question that we didn't understand. We'll ask them to work longer hours, because they got delayed thanks to the meetings we scheduled. Most of them were contractors, or off-shore developers, and the very fact that they were not in the same room with us made them feel isolated. They didn't know whom to ask for help. And every time they reached out to us for questions, we'll just ignore them, or assign some other overworked developer to help them out. Eventually the projects experienced delays and people (specially those who helped others out) started to leave for smaller companies, where their voices can be heard. The projects flopped because we couldn't predict the team members' satisfaction. And since we couldn't fix it, they found their own solutions by leaving for better options.

> "...As geographical barriers broke down and the new technology driven generations entered the workforce, companies started focusing on intangible aspects of work. The shift was driven by these new generations that are in search for more than just a job...
> 
> ...happiness at work became a topic of discussion, developing further the concept of employee engagement. Every aspect of life is filtered through personal emotions and jobs don’t shy away from this pattern. These new generations are projecting the same expectations both on their personal lives, as well as on their work lives. This is how happiness at work became a topic of interest for many companies." -- [Paula Clapon @ gethppy](http://www.gethppy.com/employee-engagement/why-you-and-your-team-are-responsible-for-happiness-at-work)

We can influence how happy our teams feel. This isn't only a good thing to do - it can help to boost performance, productivity and retention.

#### A Solution

Having a simple way for teams to share and track their happiness level will help everybody be more responsive to unpleasant situations that may increase the team frustration levels. By having this represented as a live score, that is constantly updated, we could also motivate leadership to cooperate to improve working conditions.

If there was a way to also add notes to these scores, and made them public (within the project team), it could also make other team members to help out, reducing the isolation caused by shyness, distance or time zone differences and increasing the team work.

The purpose is not to evaluate the work of the managers or team members, but to increase the overall project satisfaction so the team can be motivated and productive.

#### What is it

Dayscore is a hipchat bot that help your team members track their happiness level and voice out their concerns and achievements.

#### Project Details

-   As it heart, the bot was made around the atlassian-connect-express node.js package
-   It uses mongo as its primary database, and uses the created object id for each entry as a timestamp as well
-   Because the bot is a hipchat add-on, I took advantage of the sidebar and glance options to constantly display the dayscore of the room, as well as an easy way to check any dayscore comments so everybody can be aware of what were the latest entries and react to them accordingly
-   A small short coming at this point is that hipchat doesn't come with out of the box reminders and alarm, which makes dayscore something that needs to be added as part of the team's ceremonies, like posting a dayscore at the end of the day for example
-   The intents supported at this point are:
    -   dayscore \[0-5\]
    -   dayscore \[0-5\] _comment_
    -   dayscore report _all|month|week_

#### Screenshots

1.  Dayscore main features:  
    ![Dayscore Screenshot](https://raw.githubusercontent.com/54chi/dayscore/master/public/img/DS1.png)
    
2.  Dayscore on-screen weekly report:  
    ![Dayscore Report](https://raw.githubusercontent.com/54chi/dayscore/master/public/img/dsReport.png)
    
3.  Dayscore help:  
    ![Dayscore Help](https://raw.githubusercontent.com/54chi/dayscore/master/public/img/dsHelp.PNG)
    
4.  Dayscore sidebar for comments and notes:  
    ![Dayscore Sidebar](https://raw.githubusercontent.com/54chi/dayscore/master/public/img/DSglance1.PNG)

#### Try it out

While the add-on is being approved by atlassian, you can go here for a direct installation link: [http://dayscore01.herokuapp.com/](http://dayscore01.herokuapp.com/)

And for the repo: [https://github.com/54chi/dayscore](https://github.com/54chi/dayscore)

And yes. I know that there is a lot to be refactored :p
