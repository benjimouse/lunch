DateFormat = function () {
    'use strict';
    this.showFormattedDate = function (dateToFormat) {

        var m_names = ["January", "February", "March",
            "April", "May", "June", "July", "August", "September",
            "October", "November", "December"],
            pad = function (str, max) {
                str = str.toString();
                return str.length < max ? pad("0" + str, max) : str;
            },

            d = dateToFormat,
            curr_date = dateToFormat.getDate(),
            curr_month = dateToFormat.getMonth(),
            curr_year = dateToFormat.getFullYear(),
            curr_hour = pad(dateToFormat.getHours(), 2),
            curr_minute = pad(dateToFormat.getMinutes(), 2),
            curr_second = pad(dateToFormat.getSeconds(), 2);
        return curr_year + '-' + m_names[curr_month] + '-' + curr_date + ' ' + curr_hour + ':' + curr_minute;
    };
};
Time = function () {
    'use strict';
    var
        weeks = 0,
        days = 0,
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
    this.createMaxTimeFromSteps = function (durationSteps) {
        var maxSeconds = 0,
            self = this;
        durationSteps.forEach(function (step) {
            if (step.durationInSeconds > maxSeconds) {
                maxSeconds = step.durationInSeconds;
            }
        });
        return maxSeconds;
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
        var placeHolderSeconds, secondsInAWeek = 604800,
            secondsInADay = 86400,
            secondsInAnHour = 3600,
            secondsInAMinute = 60;
        placeHolderSeconds = this.durationInSeconds;
        this.weeks = Math.floor(placeHolderSeconds / secondsInAWeek);
        placeHolderSeconds %= secondsInAWeek;
        this.days = Math.floor(placeHolderSeconds / secondsInADay);
        placeHolderSeconds %= secondsInADay;
        this.hours = Math.floor(placeHolderSeconds / 3600);
        placeHolderSeconds %= 3600;
        this.minutes = Math.floor(placeHolderSeconds / secondsInAMinute);
        this.seconds = placeHolderSeconds % secondsInAMinute;
    };
    this.timeForDisplay = function () {
        var displayTime = ' ',
            self = this;
        // Did think about putting this into an array and then having a for loop in addTimePartForDisplay
        // ended up not worth the effort
        displayTime += self.addTimePartForDisplay(self.weeks, 'Week');
        displayTime += ' ' + self.addTimePartForDisplay(self.days, 'Day');
        displayTime += ' ' + self.addTimePartForDisplay(self.hours, 'Hour');
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
