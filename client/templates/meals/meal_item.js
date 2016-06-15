/*global Template */
/*global Meteor */
/*global Time */
/*global Session */
/*global console */
/*global DateFormat */
/*global Steps */
/*jslint nomen: true */
getStepsForMeal = function (mealId) {
    'use strict';
    return Steps.find({
        mealId: mealId
    });
};
Template.mealItem.helpers({
    ownMeal: function () {
        'use strict';
        return this.userId === Meteor.userId();
    },
    servingTime: function () {
        'use strict';
        return new DateFormat().showFormattedDate(this.serveTime);
    },
    stepCount: function () {
        'use strict';
        return getStepsForMeal(this._id).count();
    },
    totalCookingTime: function () {
        'use strict';
        var time = new Time().createTimeFromSteps(getStepsForMeal(this._id));
        return time.timeForDisplay() === '' ? 'No steps defined' : time.timeForDisplay();
    },
    durationTime: function () {
        'use strict';
        var time = new Time().createTimeFromSeconds(this.durationInSeconds);
        return time.timeForDisplay();
    },
    isDone: function () {
        'use strict';
        return !!this.done;
    },
    startStepAt: function () {
        'use strict';
        var meal = Session.get('currentMeal'),
            startTime;
        startTime = new Date(meal.serveTime.getTime() - (this.totalDuration * 1000));
        return new DateFormat().showFormattedDate(startTime);
    },
    startStepIn: function () {
        'use strict';

        var meal = Session.get('currentMeal'),
            currTime = Session.get('currentTime'),
            startTime,
            secondsToGo,
            timeToGo;
        startTime = new Date(meal.serveTime.getTime() - (this.totalDuration * 1000));
        secondsToGo = Math.floor((startTime.getTime() - currTime) / 1000);
        timeToGo = new Time().createTimeFromSeconds(secondsToGo).timeForDisplay();
        return timeToGo;
    },
    doneClass: function (isDone) {
        'use strict';
        if (isDone) {
            return 'success';
        }
        return 'info';
    },
    doneValue: function (isDone) {
        'use strict';
        if (isDone) {
            return 'undo';
        }
        return 'done';
    },
    doneBefore: function () {
        'use strict';
        var getSteps = {},
            dependantSteps = [],
            retArr = [],
            desc;
        if (!!this.doneBefore) {
            getSteps = Steps.find({
                _id: {
                    $in: this.doneBefore
                }
            }, {
                sort: {
                    submitted: -1
                },
                fields: {
                    description: true
                }
            });
            dependantSteps = getSteps.fetch();
            dependantSteps.forEach(function (dependantStep) {
                retArr.push(dependantStep.description);
            });
            return retArr.join(', ');
        }
    },
    hasDoneBefore: function () {
        'use strict';
        return !!this.doneBefore;
    }
});
Template.stepItem.events({
    'click .toggleDone': function (e) {
        'use strict';
        e.preventDefault();
        Meteor.call('toggleDone', this._id);
    }
});
/*jslint nomen: false */