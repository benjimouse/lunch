if (!Session.get('pageTitle')) {
    Session.set('pageTitle', 'Lunch');
}
//TODO: review this, could (should?) use the spacebars functionality for this.
Tracker.autorun(function () {
    'use strict';
    var durationSteps, totalSeconds = 0,
        time;
    document.title = Session.get('pageTitle');
    durationSteps = Steps.find({
        done: false
    }, {
        fields: {
            'durationInSeconds': 1
        }
    });
    time = new Time().createTimeFromSteps(durationSteps);
    Session.set('totalCookingTime', 'Total Cooking time: ' + time.timeForDisplay());
    var meal = Meals.findOne();
    if (meal) {
        var currTime = new Date().getTime();
        var startTime = new Date(meal.serveTime.getTime() - (time.durationInSeconds*1000));
        console.log(meal);
        console.log(meal.serveTime.getTime()/1000);
        var secondsToGo = Math.floor((meal.serveTime.getTime() / 1000) - time.durationInSeconds),
        timeToGo = new Time().createTimeFromSeconds(secondsToGo).timeForDisplay();
        console.log(secondsToGo);
        console.log(timeToGo);
        Session.set('timeToGo', timeToGo);
        Session.set('foo', 'baa');
    }

});