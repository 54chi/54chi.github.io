---
title: "Automated Trading"
date: 2016-02-24
tags: [blog]
---

I was looking around for different investment models (for the Investments project in the roadmap) when I found [this link](http://www.financial-hacker.com/build-better-strategies-part-2-model-based-systems/) from Johann C Lotter of Zorro Trader fame.

It is basically a neat list of different models with code examples that are up for you to use, combine or improve into your own strategy. So, without further ado, here they are:

1.  Trend (e.g. moving average crossover)
2.  Mean reversion (E.g. Rule #1)
3.  Statistical Arbitrage (e.g. comparing and ETF with its major stock)
4.  Price Constraints (grid trader like the EUR/CHF from back then)
5.  Cycles (sell/buy based on distance from 'fair' price)
6.  Clusters
7.  Curve Patterns (Frechet algorithm)
8.  Seasonality
9.  Gaps (One Night Stand System)
10.  Autoregression and Heteroskedasticity (ARIMA and GARCH)
11.  News
12.  Your own

More information [here](http://www.financial-hacker.com/build-better-strategies-part-2-model-based-systems/).

To help myself, I've made a gist with sample code for the above taken from the financial-hacker and zorro-trader sites [here](https://gist.github.com/54chi/cb6b0e15903b2afc57e3)

Don't forget to put your trade stops ;)
