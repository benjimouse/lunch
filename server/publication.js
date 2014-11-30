Meteor.publish('steps', function () {
    return Steps.find();
});