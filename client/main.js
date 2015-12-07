if (!Session.get('pageTitle')) {
    Session.set('pageTitle', 'Lunch');
}
//TODO: review this, could (should?) use the spacebars functionality for setting the page title.
Tracker.autorun(function () {
    'use strict';
    var durationSteps, totalSeconds = 0,
        time, meal, currTime, startTime;
    document.title = Session.get('pageTitle');
    meal = Meals.findOne();

    if (meal) {
        durationSteps = Steps.find({
            done: false,
            mealId: meal._id
        }, {
            fields: {
                'durationInSeconds': 1
            }
        });
        time = new Time().createTimeFromSteps(durationSteps);
        Session.set('totalCookingTime', 'Total Cooking time: ' + time.timeForDisplay());
        startTime = new Date(meal.serveTime.getTime() - (time.durationInSeconds * 1000));
        Session.set('startTime', startTime);
        Session.set('currentMeal', meal);

    }
});
// Gets the current time once a second
Meteor.setInterval(function () {
    'use strict';
    Session.set('currentTime', new Date().getTime());
}, 1000);