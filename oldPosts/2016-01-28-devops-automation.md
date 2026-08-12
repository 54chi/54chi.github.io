---
title: "On DevOps automation"
date: 2016-01-28
tags: [blog]
---

Once upon a time, there was nothing.

And Microsoft created DOS. And DOS popularized the batch file. And the batch file was able to execute multiple commands in sequence. And DevOps(1): people used it to install DOS programs. And then Microsoft decided to make it easier for DevOps people to create these installers. And they created Windows. And Visual Basic. And Windows was pretty and easy.

But then come the internet.

And internet made things more awesome, but also more complex. And Microsoft couldn't keep up with the complexity. DevOps people saw this and ran away from Microsoft. And they found linux. And OSX. And the batch file again, only that now all was more complicated.

And they went to google. And taught themselves the command prompt. And how to load balance. And do deployment scripts.

And then came Virtual Machines. And DevOps became members of the Shadow IT group. And then Agile came. And then the Cloud. And DevOps role became important again.

### My definition of DevOps (2016)

I believe the current skills are needed for modern DevOps out there:

1.  Create infrastructure (as in the past), but with emphasis on containers and portability rather than physical boxes.
2.  Create the scripts to produce such containers and maintain them.
3.  Create and review the images used for the containers (like code review for infrastructure) and make sure they are not at risk.
4.  Automate the deployment of code and testing into the infrastructure, with notification and manual verification steps for reviewers (e.g. by Product Owners) as well as gated deployments for code (e.g. from Dev to QA).
5.  Monitor performance to scale up/down containers and physical boxes (e.g. disk space)
6.  Advice on hardware recommendations and connectivity between them, both on premise and on the cloud. Hybrid (on prem+cloud) is a nice to have too.
7.  More traditional DevOps tasks: backups, provisioning of accounts, reports on operative costs and analytics of usage, security updates, load balancing and cluster monitoring if applicable, etc.

Keep in mind that although it looks like a lot more than your devops work from the past decade, once you have set this up, the maintenance cost is minimal, and the recipe can be replicated very easily for future projects.

### An Example in the works

One of these days I'll have a nice diagram to explain all these, but bear with me for now:

As part of the [roadmap](../roadmap-2016/index.html), I've planned several projects that I want to build with Elixir in the near future.

It's still to early to tell, but this is the plan so far (DevOps wise):

-   Use Otto or Vagrant to manage the following environments: dev, qa and prod.
-   Create scripts to spawn four containers:
    -   One container for Elixir.
    -   One container for Phoenix.
    -   One container for Cassandra DB.
    -   One container for Titan DB.
    -   The base OS for all containers is Linux 64-bit (CentOS, Ubuntu or Debian).
-   Shared with all projects for the dev environment(2), we'll have two containers:
    -   One container for Jenkins and CI.
    -   One container for Projects' documentation.
-   The scripts should also include the configuration files to build, test and deploy within the environments via the CI tool.
-   The scripts may also include code coverage and test automation (TDD and/or BDD depending the layer(s) to test).
-   Have the scripts ready to send notifications from the CI tool.
-   Have the scripts ready to be deployed on AWS or some other cloud out there.
-   This very same script can be reused for at least 3 projects that I have in the pipeline.

More to come.

* * *

\[1\]: I'm talking about the average underpaid IT DevOps, you know, the one that also runs your network cables and order your laptops :p  
\[2\]: Depending on my budget (and/or patience), I may decide to use an existing service, e.g. TravisCI and the repo's Readme (with something like inch-ci for code coverage).  
\[3\]: This is all my personal opinion, based on my experience. Your mileage may vary.
