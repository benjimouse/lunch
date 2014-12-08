Template.stepItem.helpers({

    durationTime: function () {
        'use strict';
        return formatSecondsAsTime(this.durationInSeconds);
    }
});