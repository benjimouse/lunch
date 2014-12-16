// Local (client-only) collection
Errors = new Mongo.Collection(null);

throwError = function (message) {
    'use strict';
    Errors.insert({
        message: message
    });
};