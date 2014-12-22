Template.header.helpers({
    pageTitle: function () {
        'use strict';
        return Session.get('pageTitle');
    },
    totalCookingTime: function () {
        'use strict';
        return Session.get('totalCookingTime');
    },
    serveTime: function () {
        'use strict';
        var meal = Meals.findOne();
        if (meal) {
            return new DateFormat().showFormattedDate(meal.serveTime);
        }
    },
    timeToGo: function () {
        'use strict';
        var currTime = Session.get('currentTime'),
            startTime = Session.get('startTime'),
            secondsToGo, timeToGo;
        secondsToGo = Math.floor((startTime.getTime() - currTime) / 1000);
        timeToGo = new Time().createTimeFromSeconds(secondsToGo).timeForDisplay();

        return timeToGo;
    },
    startTime: function () {
        'use strict';
        if (Session.get('startTime')) {
            return new DateFormat().showFormattedDate(Session.get('startTime'));
        }
    }
});