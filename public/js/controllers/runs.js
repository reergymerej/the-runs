'use strict';

// $scope       This is created for each directive.
// $stateParams This comes from AngularUI Router.
// $location    http://docs.angularjs.org/guide/dev_guide.services.$location
angular.module('runs').controller('RunsCtrl', ['$resource', '$scope', '$stateParams', '$location', 'Runs', function ($resource, $scope, $stateParams, $location, Runs) {

    $scope.run = undefined;
    $scope.runs = undefined;
    $scope.date = new Date();
    $scope.distance = undefined;



    // $scope.create = function() {

    //     // Create a new instance of the Articles $resource.
    //     // $resource allows for easy CRUD operations.
    //     // 
    //     // this === $scope
    //     // this.title and this.content are added to the scope
    //     // through ngModel in the view (/public/views/articles/create.html).
    //     var article = new Articles({

    //         // Load the values into the $resource.
    //         title: this.title,
    //         content: this.content
    //     });

    //     // Save the $resource.
    //     // REF: http://docs.angularjs.org/api/ngResource/service/$resource
    //     // If the XHR fails, the 2nd callback will run.
    //     article.$save(function(response) {

    //         // response === article

    //         // Since the template uses native form validation ("required" attribute), it should
    //         // not be possible to submit without the required fields.
    //         // If it were possible, the response would contain response.errors
    //         // with the validation errors defined in /app/models/article.js.

    //         // All MongoDB items (AKA documents) have an
    //         // auto-generated _id field.
    //         // REF: http://docs.mongodb.org/manual/core/document/

    //         // Redirect to view the saved article.
    //         // REF: http://docs.angularjs.org/api/ng/service/$location
    //         // GOTO: /public/js/config.js (GET /articles/article_id)
    //         $location.path('articles/' + response._id);
    //     }/*, function (response) { console.error('oh, shit', response); }*/);

    //     this.title = '';
    //     this.content = '';
    // };

    // // Delete an article.
    // $scope.remove = function(article) {

    //     if (article) {
    //         article.$remove();

    //         for (var i in $scope.articles) {
    //             if ($scope.articles[i] === article) {
    //                 $scope.articles.splice(i, 1);
    //             }
    //         }
    //     }
    //     else {

    //         // When called from the article view, no article
    //         // is specified since we already know we're dealing
    //         // with the article in this controller's scope.
    //         // Remove the article.
    //         // REF: http://docs.angularjs.org/api/ngResource/service/$resource
    //         $scope.article.$remove();

    //         // Redirect back to all articles.
    //         // path() gets the path, path('foo') sets the path
    //         // REF: http://docs.angularjs.org/api/ng/service/$location
    //         // GOTO: /public/js/config.js (GET /articles);
    //         $location.path('articles');
    //     }
    // };

    // // This is called by the edit page. (/public/views/articles/edit.html)
    // $scope.update = function() {
    //     var article = $scope.article;

    //     // QUESTION: What does this array do?
    //     // The updated array is sent to the server, but the model
    //     // doesn't have an updated field.  "updated" is not referenced
    //     // anywhere else on the client-side.
    //     if (!article.updated) {
    //         article.updated = [];
    //     }
    //     article.updated.push(new Date().getTime());

    //     // PUT the updates.
    //     // REF: http://docs.angularjs.org/api/ngResource/service/$resource
    //     article.$update(function() {

    //         // Once updated, redirect to view the article.
    //         // GOTO: /public/js/config.js (GET /articles/articleId)
    //         $location.path('articles/' + article._id);
    //     });
    // };

    // This finds all the articles.
    $scope.find = function () {
        Runs.query(function (runs) {
            $scope.runs = runs;
        });
    };

    // This finds a specific article by id.
    $scope.findOne = function () {
        Runs.get({
            id: $stateParams.id
        }, function (run) {
            $scope.run = run;
            $scope.date = run.date;
            $scope.distance = run.distance;
        });
    };

    $scope.create = function () {
        var run = new Runs({
            date: this.date,
            distance: this.distance
        });

        run.$save(function (run) {
            $location.path('runs/' + run._id);

        }, function (run) {
            console.error(run);
        });
    };

    $scope.delete = function (run) {
        var whichRun = run || $scope.run;


        if (confirm('Really?')) {
            whichRun.$remove();
            // $scope.run.$remove();

            if (!$scope.runs) {
                $location.path('runs');
            } else {
                $scope.runs.splice($scope.runs.indexOf(run), 1);
            }
        }
    };
}]);