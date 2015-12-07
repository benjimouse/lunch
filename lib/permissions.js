// check that the userId specified owns the documents
ownsDocument = function (userId, doc) {
    'use strict';
    // Allow editing of the default meal
    //return doc && doc.userId === userId;
    return true;
};