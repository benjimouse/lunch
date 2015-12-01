Template.header.helpers({
    pageTitle: function () {
        'use strict';
        return Session.get('pageTitle');
    },
    totalCookingTime: function () {
        'use strict';
        return Session.get('totalCookingTime');
    },
    servingTime: function () {
        'use strict';
        var meal = Meals.findOne();
        if (meal) {
            return new DateFormat().showDateTimeForEditing(meal.serveTime);
        }
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
        console.log(this);
        Session.set('editingServingTime', true);
        //TODO: Finish
    }
});