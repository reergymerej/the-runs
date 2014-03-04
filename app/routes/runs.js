'use strict';

var runs = require('../controllers/runs');

module.exports = function (app) {

    app.param('id', runs.load);

    app.get('/runs', runs.all);
    app.get('/runs/:id', runs.read);
    app.post('/runs', runs.create);
    app.put('/runs/:id', runs.update);
    app.delete('/runs/:id', runs.delete);
        

    // // Execute the "signin" method of the users controller.
    // // GOTO: /app/controllers/users.js:signin
    // app.get('/signin', users.signin);

    // // Execute the signup method of the users controller.
    // // GOTO: /app/controllers/users.js:signup
    // app.get('/signup', users.signup);

    // // GOTO: /app/controllers/users.js:signout
    // app.get('/signout', users.signout);

    // // QUESTION: When is this used?
    // app.get('/users/me', users.me);

    // // Setting up the users api
    // // This route is triggered by submitting the signup form.
    // // The "create" method of the users controller is called.
    // // GOTO: /app/controllers/users.js:create
    // app.post('/users', users.create);

    // // Setting up the userId param
    // // "param" allows you to inject logic when a parameter
    // // is present in a request.
    // // REF: http://expressjs.com/api.html#app.param
    // // 
    // // // This route has a :bar param.
    // // app.get('/foo/:bar', function (req, res) {
    // //     res.end('Was :bar "asdf"? ' + req.message);
    // // });
    // // 
    // // // If the :bar param is present in the route,
    // // // we get the chance to do work before the route's
    // // // callback is executed.
    // // app.param(':bar', function (req, res, next, id) {
    // //     req.message = id === 'asdf';
    // //     next();
    // // });
    // // 
    // // Try out different values to see the result.
    // // http://localhost:3000/foo/qwerty
    // // 
    // // All that aside, I can't figure out where this is being used.
    // app.param('userId', users.user);


    // // Setting the local strategy route
    // // This is called when logging in.  Use Passport to authenticate.
    // // REF: http://passportjs.org/guide/authenticate/
    // app.post('/users/session', passport.authenticate('local', {

    //     // GOTO: [this file] (GET /signin)
    //     failureRedirect: '/signin',
    //     failureFlash: true

    //     // This is the handler for a successful login.
    //     // GOTO: /app/controllers/users.js:session
    // }), users.session);
};
