'use strict';

var mongoose = require('mongoose'),
    Run = mongoose.model('Run');

exports.load = function (req, res, next, id) {
    Run.findOne({ _id: id }).exec(function (err, run) {
        if (err) {
            return next(err);
        } else if (!run) {
            return next(new Error('unable to find run ' + id));
        } else {
            req.run = run;
            next();
        }
    });
};

exports.create = function (req, res) {
    var run = new Run(req.body);

    run.save(function (err) {
        if (err) {
            res.status(500).end();
        } else {
            res.jsonp(run);
        }
    });
};

exports.read = function (req, res) {
    res.jsonp(req.run);
};

exports.update = function (req, res) {
    res.end('hi');
};

exports.delete = function (req, res) {
    req.run.remove(function (err) {
        if (err) {
            res.status(500).end();
        } else {
            res.jsonp(req.run);
        }
    });
};

exports.all = function (req, res) {
    Run.find().exec(function (err, runs) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(runs);
        }
    });
};


/**
 * Create user
 */
// This method is triggered when the signup form is submitted.
// exports.create = function(req, res, next) {

//     // A new User is created, loaded with the data
//     // from the request.  With POST requests, the data
//     // is in req.body.
//     // REF: http://expressjs.com/api.html#req.body
//     var user = new User(req.body);
//     var message = null;

//     user.provider = 'local';

//     // Attempt to save the new User instance.
//     user.save(function(err) {
//         if (err) {

//             // REF: http://www.mongodb.org/about/contributors/error-codes/
//             switch (err.code) {
//                 case 11000:
//                 case 11001:
//                     message = 'Username already exists';
//                     break;
//                 default:
//                     message = 'Please fill all the required fields';
//             }

//             // Re-render the signup page, passing our User instance
//             // and error message to the template.
//             // GOTO: /app/routes/users.js
//             return res.render('users/signup', {
//                 message: message,
//                 user: user
//             });
//         }

//         // Log the user in using the Passport middleware.
//         // REF: http://passportjs.org/guide/login/
//         req.logIn(user, function(err) {
//             if (err) return next(err);

//             // Passport makes the user available through req.user.
//             // Now that we're logged in, go to the / path.
//             // REF: http://expressjs.com/api.html#res.redirect
//             // GOTO: /app/routes/index.js
//             return res.redirect('/');
//         });
//     });
// };


// /**
//  * Find user by id
//  */
// // QUESTION: Where is this used?
// exports.user = function(req, res, next, id) {

//     console.log('hello');
//     // QUESTION: What's using this?
//     User
//         .findOne({
//             _id: id
//         })
//         .exec(function(err, user) {
//             if (err) return next(err);
//             if (!user) return next(new Error('Failed to load User ' + id));
//             req.profile = user;
//             next();
//         });
// };