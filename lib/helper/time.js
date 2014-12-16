Time = function () {
    'use strict';
    var
        hours = 0,
        minutes = 0,
        seconds = 0,
        durationInSeconds = 0;
    this.createTimeFromSteps = function (durationSteps) {
        var totalSeconds = 0,
            self = this;
        durationSteps.forEach(function (step) {
            totalSeconds += parseInt(step.durationInSeconds, 10);
        });
        return self.createTimeFromSeconds(totalSeconds);
    };
    this.createTimeFromSeconds = function (durationInSeconds) {
        var self = this;
        self.durationInSeconds = durationInSeconds;
        self.secondsToHoursMinutesSeconds();
        return self;

    };
    //    TODO: Make this a private method,
    //     tried but everything blew up...
    this.secondsToHoursMinutesSeconds = function () {
        var placeHolderSeconds;
        placeHolderSeconds = this.durationInSeconds;
        this.hours = Math.floor(placeHolderSeconds / 3600);
        placeHolderSeconds %= 3600;
        this.minutes = Math.floor(placeHolderSeconds / 60);
        this.seconds = placeHolderSeconds % 60;
    };
    this.timeForDisplay = function () {
        var displayTime = ' ',
            self = this;
        // Did think about putting this into an array and then having a for loop in addTimePartForDisplay
        // ended up not worth the effort
        displayTime += self.addTimePartForDisplay(self.hours, 'Hour');
        displayTime += ' ' + self.addTimePartForDisplay(self.minutes, 'Minute');
        displayTime += ' ' + self.addTimePartForDisplay(self.seconds, 'Second');

        return displayTime.trim();
    };
    this.addTimePartForDisplay = function (timePart, timeDescription) {
        if (timePart > 1) {
            return timePart + " " + timeDescription;
        }
        if (timePart === 1) {
            return timePart + " " + timeDescription + 's';
        }
        return '';
    };
};