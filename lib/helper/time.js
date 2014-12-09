formatSecondsAsTime = function (timeInSeconds) {
    'use strict';
    var hours, minutes, seconds, timeForDisplay;

    seconds = timeInSeconds;
    //console.log('time in seconds');
    //console.log(timeInSeconds);
    hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;


    //TODO: Revisit this, it doesn't feel right, should probably be in the template?
    timeForDisplay = function (hours, minutes, seconds) {
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
        return displayTime.trim();
    };
    return timeForDisplay(hours, minutes, seconds);
};
