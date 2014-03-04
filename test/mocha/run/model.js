'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Run = mongoose.model('Run');

var run;

describe('Run model', function () {
    beforeEach(function (done) {
        run = new Run();
        done();
    });

    it('should not save without a distance', function (done) {
        delete run.distance;
        run.save(function (err) {
            should.exist(err);
            done();
        });
    });

    afterEach(function (done) {
        run.remove();
        done();
    });
});