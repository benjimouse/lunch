DateFormat = function () {
    'use strict';
    this.showFormattedDate = function(dateToFormat){
    
        var m_names = new Array("January", "February", "March",
            "April", "May", "June", "July", "August", "September",
            "October", "November", "December");

        var d = dateToFormat;
        var curr_date = dateToFormat.getDate();
        var curr_month = dateToFormat.getMonth();
        var curr_year = dateToFormat.getFullYear();
        var curr_hour = dateToFormat.getHours();
        var curr_minute = dateToFormat.getMinutes();
        var curr_second = dateToFormat.getSeconds();
        return curr_year + '-' + m_names[curr_month] + '-' + curr_date + ' ' + curr_hour + ':'+ curr_minute;
    }
}
Time = function () {
    'use strict';
    var
        hours = 0,
        minutes = 0,
        seconds = 0,
        durationInSeconds = 0;
    this.createTimeFromHoursMinutesSeconds = function (hours, minutes, seconds) {
        var self = this,
            totalSeconds;
        hours = isNaN(hours) ? 0 : hours;
        minutes = isNaN(minutes) ? 0 : minutes;
        seconds = isNaN(seconds) ? 0 : seconds;
        totalSeconds = (hours * 60 * 60) + (minutes * 60) + seconds;

        return self.createTimeFromSeconds(totalSeconds);
    };
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
        if (timePart === 1) {
            return timePart + " " + timeDescription;
        }
        if (timePart > 1) {
            return timePart + " " + timeDescription + 's';
        }
        return '';
    };
};