# Notes: Deploying MEAN Boilerplate to Heroku

## Create the Heroku App

    heroku create

### Push to Heroku

    git push heroku master

### View the App
    
    heroku open

### WTF?  Application Error

> Mongo is not available.

## Setup Mongo

[MongoHQ](http://tour.mongohq.com/) offers free hosting for MongoDBs.  [Heroku](http://www.heroku.com/) has a free [addon](https://addons.heroku.com/marketplace/mongohq#sandbox) for MongoHQ.

### Add MongoHQ

    heroku addons:add mongohq

Heroku wants my credit card before allowing the addon.  Um, no.

### Use MongoHQ with Heroku without a Credit Card

The Heroku addon basically just sets up your HerokuHQ stuff for you.  If you want to skip the credit card, you can set it up yourself.

#### Setup MongoHQ

[Create a MongoHQ account](https://bridge.mongohq.com/signup).  Choose the free sandbox version.

Once you're set up, find the url to your sweet new db.  It looks something like: **mongodb://<user>:<password>@troup.mongohq.com:10027/reergymerej**

Create a user for the db through the web interface.  I'm sure you can do it from terminal, but you're already here.

Now go to your terminal.  :)  Verify that you can connect.

    mongo troup.mongohq.com:10027/reergymerej -u <user> -p<password>

or

    mongo troup.mongohq.com:10027/reergymerej
    db.auth('dude', 'dude');

### Connect Your App

See if you can connect to your MongoHQ db from your local MEAN app.

Where do you change the db settings?

> /config/env/development.js

Change the db from `localhost` to the url you got above (the one with the username/password in it).

    db: 'mongodb://dude:dude@troup.mongohq.com:10027/reergymerej',

#### Welcome to Error Town
    
    /home/grizzle/code/the-runs/node_modules/mongodb/lib/mongodb/connection/base.js:242
        throw message; 

I know the authentication works since I can connect through the terminal directly.  I'm too tired to figure this out tonight.

#### Try, Try Again

The problem was with my copy/paste.  In /config/env/development.js, I specified

    db: 'mongodb://dude:dude@troup.mongohq.com:10027/',

instead of

    db: 'mongodb://dude:dude@troup.mongohq.com:10027/reergymerej',

Dur.

I tested locally pointing at the remote db and everything's working.  I confirmed through the UI and terminal.

    mongo troup.mongohq.com:10027/reergymerej
    db.auth('dude', 'dude');
    db.runs.find().pretty();

Now, let's deploy this sucker.  Change db in production 

    /config/env/production.js

## Commit and Push

    git add .
    git commit -m 'change db config for production'
    git push heroku master

This pushes from our local repo to Heroku, not from our Github repo.  Changes must be commited to the local git repo before they can be pushed to Heroku.

Around this point, my notes degrade pretty quickly.  I changed the production db to the MongoHQ db and kept the dev db pointing at localhost.  Heroku deployed alright, but the app wouldn't respond in the browser.  `heroku logs` mentioned something about failing to connect to localhost, so I figured the app still thought it was in dev mode.  For expediency, I changed the dev db to the remote also, deployed again, and everything started working.

Along the way, I noticed there's a MONGOHQ_URL in `/config/env/all.js`.  We should probably use that, but lunch breaks are only so long.  I chewed up a bit of my time researching how to keep from exposing credentials in Github.

*Edit: heroku config:set NODE_ENV=production*


## Keep Production Credentials off Github

We use git to deploy to Heroku.  We also use git to save our code on Github.  How can we keep our production credentials in git, available to push to Heroku, but not available to Github?

I haven't quite figured it out and that's OK since my username &password are both 'dude' and no one's going to bring down my test db rocking one dyno.  It's a good question, though.  Here are a couple references I found:

* [decent answer](http://cogniton-mind.tumblr.com/post/63560840467/howto-gitignore-for-different-branches-update) using multiple branches
* [better, more complex answer](http://stackoverflow.com/a/3234457/1319850) from a dude with a high reputation

## tl;dr

* Heroku doesn't provide MongoDB.
* Create the db in HerokuHQ.
* Configure MEAN environments to use HerokuHQ.
* Don't push username/password to Github.

---
**References**

* [http://cogniton-mind.tumblr.com/post/63560840467/howto-gitignore-for-different-branches-update](http://cogniton-mind.tumblr.com/post/63560840467/howto-gitignore-for-different-branches-update)
* [http://www.100percentjs.com/deploying-mean-io-to-heroku/](http://www.100percentjs.com/deploying-mean-io-to-heroku/)
* [http://www.elliotbradbury.com/use-mongohq-heroku-without-verifying-account/](http://www.elliotbradbury.com/use-mongohq-heroku-without-verifying-account/)
* [http://support.mongohq.com/common-questions/debugging-connection-issues.html#username-password](http://support.mongohq.com/common-questions/debugging-connection-issues.html#username-password)