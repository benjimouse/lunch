Template.stepItem.helpers({
    ownStep: function () {
        'use strict';
        return this.userId === Meteor.userId();
    },
    durationTime: function () {
        'use strict';
        var time = new Time().createTimeFromSeconds(this.durationInSeconds);
        return time.timeForDisplay();
    }
});