Template.stepItem.helpers({

    durationTime: function () {
        'use strict';
        var hours, minutes, seconds;

        seconds = this.durationInSeconds;
        hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;

        //TODO: Revisit this, it doesn't feel right, should probably be in the template?
        function timeForDisplay(hours, minutes, seconds) {
            var displayTime = "";
            if (hours > 0) {
                displayTime += " " + hours + " Hours";
            }
            if (minutes > 0) {
                displayTime += " " + minutes + " Minutes";
            }
            if (seconds > 0) {
                displayTime += " " + seconds + " Seconds";
            }
            return displayTime;
        }
        return timeForDisplay(hours, minutes, seconds);
    }
});