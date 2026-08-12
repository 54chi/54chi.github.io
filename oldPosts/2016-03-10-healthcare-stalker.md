---
title: "Healthcare Stalker"
date: 2016-03-10
tags: [blog]
---

Recently, I've been participating in some hackathons...Somehow (maybe via a meetup link), I got to know of [devpost](http://devpost.com). Unlike traditional Hackathons, they also offer what I would call open-ended "proof of concepts" contests (they call them hackathons :p). They are usually online-only contests (at least their first stage) and spans over the course of several weeks (even months!)

One of those contests is the MDP Challenge (MDP=More Disruption Please) organized by AthenaHealth. Basically it is all about optimizing the patient/doctor/hospital in USA using technology.

mermaid.initialize({startOnLoad:true});

Long story short, I have an idea. Let's call it _Healthcare Stalker_ for now.

HS will have 3 components:

1.  Data Entry (by the doctor)
2.  Tracking App (on the patient's device(s))
3.  Reports and General Management (for the hospitals managers)

All of these, tied together by a common API (Rest and Real Time/Streaming services)

Some simplified use cases to showcase the API usage:

graph TB subgraph API App\[API\] --> rs App --> cs App --> ps App --> ms App --> mi App --> is App --> ds App --> mgs App --> ma mi\[Medical Info  
Services\] rs\[Recipes  
Services\] ps\[Promotion  
Services\] cs\[Context  
Services\] ms\[Messaging  
Services\] is\[Identity  
Services\] ds\[Data Services:  
attachments, OTA updates\] mgs\[Managing Services:  
remote settings\] ma\[Doctor's Schedule  
Services\] end subgraph Mobile App Patient - Examples Pat((Patient App)) -. login .-> is Pat -. shopping  
list .-> rs Pat -. checks-in  
pharmacy .-> cs Pat -. medicine  
reminders .-> alarms Pat -. set up appointment .-> calendar Pat -. contact doctor .-> ms calendar -.- ma end subgraph Mobile App Care Provider - Examples Doc((Doctor's App)) -. login .-> is Doc -. set reminders .-> alarms2\[alarms\] Doc -. checks-in  
hospital .-> cs Doc -. update patient's  
records .-> rs Doc -. check patient's  
activities .-> cs Doc -. provide  
recommendations .-> cs Doc -. send patient's results .-> ds end

All the data collected could help hospitals to improve the patients flows, doctors' shifts, location for future satellite hospitals, etc. etc.

Eventually, the API could be extended to other devices and technologies. E.g.

-   Doctors could use voice recognition appliances (e.g. Echo, Siri) or e-Glasses to keep their hands free.
-   Patients can use smart watches to share additional information like heart rate, galvanic response/skin temperature, etc.)

Of course this is only an idea (for now). Having this in real life will be awesome, but could also be really really creepy (and dangerous) if not properly controlled.
