// check that the userId specified owns the documents
ownsDocument = function (userId, doc) {
    'use strict';
    return doc && doc.userId === userId;
};