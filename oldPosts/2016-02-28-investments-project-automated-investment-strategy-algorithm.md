---
title: "Investments project: Automated investment strategy algorithm"
date: 2016-02-28
tags: [projects]
---

For the 4th project, I wanted to have some fun with data analytics.

I needed some public data that can be used to do some "future prediction" on them. The first thing that came to my mind was to get stock market data.

There are thousands of stocks out there, and finding the best ones for my project was challenging, specially finding stock data that can go a few years back to improve the prediction.

Enter Forex.

Forex uses currencies instead of regular stocks, with the advantage (for my purposes) that they aren't as many, and they have a huge amount of historical data that can be retrieved for free (e.g. free accounts from [FXCM](https://www.fxcm.com/))

Once I got the historical data, the next step was to identify patterns in the data and try to predict the future using one or more of the models described in [my previous post](../automated-trading/index.html).

I used 2 currencies: EUR/USD and USD/JPY, with historical data from 2012 to 2016, making sure it hit some of the market crisis from the past years, which helped me optimize the algorithm just a bit.

```
PSEUDOCODE  
==========
1. Use the Cycles Trading Algo  
2. Currencies to Trade: EUR/USD, USD/JPY  
3. Only reinvest 0.8 of the square root of portfolio's component profits  
4. Apply optimized filters  
5. For every open trade,  raise the stop loss a bit to maximize profit  
6. Trade short or long based on the Amplitude vs. Threshold  
7. Execute program and leave it running forever  
```

I did all this with a small C program with Zorro Trader.

But Zorro Trader is a desktop app. "Running forever" would have meant having a PC in my home running 24x7,and hoping that the internet connection remains stable.

So, enter the 2nd part of the project: setting up a VPS (Virtual Private Server) on the cloud. The good news is that it can be done on the cheap (for a decent amount of computing power anyways). AWS have one [here](https://aws.amazon.com/free/).

Setting up a Windows server in the cloud, installing Zorro and the trading algorithm is a matter of minutes (depending on your internet connection of course).

I also set up a demo account for trading with FXCM. You get $50,000 fake money, set it up in Zorro annd let it run.

And that's it. The only problem (for algorithm verification purposes) is that a Cycle trading will take a few days to start investing.

But eventually, I'll let you know how it worked ;)
