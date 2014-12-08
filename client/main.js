if (!Session.get('pageTitle')) {
    Session.set('pageTitle', 'Lunch');
}
//TODO: review this, could (should?) use the spacebars functionality for this.
Tracker.autorun(function () {
    'use strict';
    var durationSteps, totalSeconds = 0;
    document.title = Session.get('pageTitle');
    durationSteps = Steps.find({}, {
        fields: {
            'durationInSeconds': 1
        }
    });
    durationSteps.forEach(function (step) {
        totalSeconds += step.durationInSeconds;
    });
    Session.set('totalCookingTime', 'Total Cooking time: ' + formatSecondsAsTime(totalSeconds));
});