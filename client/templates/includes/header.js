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
        return Session.get('timeToGo');
    },
    startTime: function () {
        'use strict';
        var meal = Meals.findOne();
        if (meal) {
            var startTime = new Date(meal.serveTime.getTime() - (time.durationInSeconds * 1000));
            return new DateFormat().showFormattedDate(meal.serveTime);
        }
    }
});