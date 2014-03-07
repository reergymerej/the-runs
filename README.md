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

See if you can connect your local app.

Where do you change it?
    /config/env/development.js

Welcome to Error Town.
    /home/grizzle/code/the-runs/node_modules/mongodb/lib/mongodb/connection/base.js:242
        throw message; 


I know the authentication works since I can connect through the terminal directly.  I'm too tired to figure this out tonight.


---
# References

http://www.100percentjs.com/deploying-mean-io-to-heroku/

http://www.elliotbradbury.com/use-mongohq-heroku-without-verifying-account/

http://support.mongohq.com/common-questions/debugging-connection-issues.html#username-password