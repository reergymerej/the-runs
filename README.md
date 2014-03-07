# How to Deploy MEAN to Heroku

## Create the Heroku App

    heroku create

## Push to Heroku

    git push heroku master

## View the App
    
    heroku open

## WTF?  Application Error

    Mongo is not available.

## Add MongoHQ

    heroku addons:add mongohq

Heroku wants my credit card before allowing the addon.

## Find a Free MongoHQ

The Heroku addon basically just sets up your HerokuHQ stuff for you.  Skip the credit card and do it yourself.

### Create an Account

https://bridge.mongohq.com/signup

choose the free sandbox version

find the url

mongodb://<user>:<password>@troup.mongohq.com:10027/reergymerej

create a user for the db

In the console, test that you can connect.

    mongo troup.mongohq.com:10027/reergymerej -u <user> -p<password>

    or

    mongo troup.mongohq.com:10027/reergymerej
    db.auth('dude', 'dude');

See if you can connect your local app.

Where do you change it?
    /config/env/development.js

Welcome to Error Town.
    /home/grizzle/code/the-runs/node_modules/mongodb/lib/mongodb/connection/base.js:242
        throw message; 


I know the authentication works since I can connect through the terminal directly.  I'm too tired to figure this out tonight.

The problem was with my copy/paste.  In /config/env/development.js, I specified:

    db: 'mongodb://dude:dude@troup.mongohq.com:10027/',

instead of:

    db: 'mongodb://dude:dude@troup.mongohq.com:10027/reergymerej',

Dur.

I tested locally pointing at the remote db and everything's working.  I confirmed through the UI and terminal.

    mongo troup.mongohq.com:10027/reergymerej
    db.auth('dude', 'dude');
    db.runs.find().pretty();

Now, let's deploy this sucker.

Change db in production (/config/env/production.js).

Commit everything.

## How do you save your configuration to Github without displaying your credentials?

Can you omit the credentials from github and just push to heroku with your local files?
    http://cogniton-mind.tumblr.com/post/63560840467/howto-gitignore-for-different-branches-update

    http://stackoverflow.com/questions/3234154/git-how-to-ignore-a-file-from-one-repo-and-add-it-to-another

Made local changes, saved but did not commit.

    git push heroku master

Did the change show up?

    - no, everything up to date

Commit

    git push heroku master

## Deploy to Heroku

The changes must be commited to the local git repo before they can be pushed to Heroku.


After changing my dev db back to localhost, heroku wasn't starting.  The Heroku app must be using development.


There's a MONGOHQ_URL in /config/env/all.js.  We should probably use that.

---
# References

http://cogniton-mind.tumblr.com/post/63560840467/howto-gitignore-for-different-branches-update

http://www.100percentjs.com/deploying-mean-io-to-heroku/

http://www.elliotbradbury.com/use-mongohq-heroku-without-verifying-account/

http://support.mongohq.com/common-questions/debugging-connection-issues.html#username-password