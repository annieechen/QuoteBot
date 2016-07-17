# CS50 Quote Bot

##### Created by Anthony Bau, Annie Chen, and Brian Yu at CS50's Hackathon 7/14/16

This bot maintains a quote list that is queried through Slack.

Add a quote via:

```
/quotelist add NAME QUOTE
```

where NAME is the person who said the quote, and QUOTE is the quote.

Find a quote via:

```
/quotelist NAME
```

A random quote in the database by NAME will be returned in Slack. If no quotes match the query, the quote bot will tell you that the person has no quotes.


# Install Into Your Own Slack Channel!

###### NOTE: I learned to create my first slackbot via [Andrew Mager's How to Write a Slackbot in 40 lines of code](https://mager.co/how-to-write-a-slackbot-in-40-lines-of-code-52cf0c4fcf42#.4ledt6wgk), and so a lot of the infrastructure is taken from that tutorial. 

### Steps
###### Obviously these will be fleshed out further, likely in a blog post, but general outline for now.

* open a nodeJS Cloud9 workspace
..* with this repo cloned
* Set up Mlabs Account
* Set up a Heroku instance
* Connect the instance with this repo and push
..* set up environmental variable on heroku for MONGO_URL
* Set up connection on Slack integration
* Refresh slack and try it out
* 

#### Now Make it Your Own!

* heroku logs -t
* console.log

## Known bugs/"features"/TODOS

* `/quotelist add` will return an error
* No way to modify quotes once entered
* No way to attribute quotes to a name with a space in it. _i.e_ `/quotelist add Dan A "This is my quote"` will enter `A "This is my quote."` into the database under  `Dan`.
* No way to attribute a quote to two or people at once
* Perhaps an error with when quotation marks show up in database vs Slack channel? 