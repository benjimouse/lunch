// Not var'd as it's a global variable.
Steps = new Mongo.Collection('steps');
Steps.allow({
    update: function (userId, step) {
        'use strict';
        return ownsDocument(userId, step);
    },
    remove: function (userId, step) {
        'use strict';
        return ownsDocument(userId, step);
    }
});
Stepss.deny({
    update: function (userId, step, fieldNames) {
        'use strict';
        // may only edit the following two fields:
        return (_.without(fieldNames, 'durationInSeconds', 'description').length > 0);
    }
});
Meteor.methods({
    stepInsert: function (stepAttributes) {
        'use strict';
        check(Meteor.userId(), String);
        check(stepAttributes, {
            description: String,
            durationInSeconds: Number
        });
        // I really can't think why I need to do this check, so should probably remove this
        // however for now let's see, I may want it if it's going to be using all of the same ones.
        var identicalStep = Steps.findOne({
            description: stepAttributes.description,
            durationInSeconds: stepAttributes.durationInSeconds
        });
        if (identicalStep) {
            return {
                stepExists: true,
                _id: identicalStep._id
            };
        }
        var user = Meteor.user(),
            step = _.extend(stepAttributes, {
                userId: user._id,
                author: user.username,
                submitted: new Date()
            }),
            stepId = Steps.insert(step);
        return {
            _id: stepId
        };
    }
});