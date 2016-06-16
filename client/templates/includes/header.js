Template.header.helpers({
    currentMeal: function () {
        'use strict';
        return Session.get('currentMeal');
    },
    hasCurrentMeal: function () {
        'use strict';
        return !!Session.get('currentMeal');
    },
    pageTitle: function () {
        'use strict';
        if (!!Session.get('currentMeal')) {
            return Session.get('currentMeal').title;
        } else {
            return Session.get('pageTitle');
        }
    },
    totalCookingTime: function () {
        'use strict';
        return Session.get('totalCookingTime');
    },
    servingTime: function () {
        'use strict';

        var meal = Session.get('currentMeal');
        if (meal) {
            return new DateFormat().showDateTimeForEditing(meal.serveTime);
        }
    },
    serveTime: function () {
        'use strict';

        var meal = Session.get('currentMeal');
        if (meal) {
            return new DateFormat().showFormattedDate(meal.serveTime);
        }
    },
    timeToGo: function () {
        'use strict';
        var currTime = Session.get('currentTime'),
            startTime = Session.get('startTime'),
            secondsToGo,
            timeToGo;
        if (startTime) {
            secondsToGo = Math.floor((startTime.getTime() - currTime) / 1000);
            timeToGo = new Time().createTimeFromSeconds(secondsToGo).timeForDisplay();
            return timeToGo;
        }
    },
    startTime: function () {
        'use strict';
        if (Session.get('startTime')) {
            return new DateFormat().showFormattedDate(Session.get('startTime'));
        }
    },
    editingServingTime: function () {
        'use strict';
        return !!Session.get('editingServingTime');
    }
});
Template.header.events({
    'click #servingTime': function (e) {
        'use strict';
        e.preventDefault();
        Session.set('editingServingTime', true);

    },
    'click #updateServingDate': function (e) {
        'use strict';
        e.preventDefault();
        var currentMeal = Session.get('currentMeal'),
            mealTime = new Date($('#servingDate').val());

        Session.set('editingServingTime', false);

        Meals.update(currentMeal._id, {
            $set: {
                serveTime: mealTime
            }
        }, function (error) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
            } else {

            }
        });
    }
});