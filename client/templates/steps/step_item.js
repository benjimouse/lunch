Template.stepItem.helpers({
    ownStep: function () {
        'use strict';
        return this.userId === Meteor.userId();
    },
    totalDuration: function () {
        'use strict';
        var time = new Time().createTimeFromSeconds(this.totalDuration);
        return time.timeForDisplay();
    },
    durationTime: function () {
        'use strict';
        var time = new Time().createTimeFromSeconds(this.durationInSeconds);
        return time.timeForDisplay();
    },
    isDone: function () {
        'use strict';
        // The !! returns false for 0, false, '', undefined etc. but true otherwise:
        // See http://stackoverflow.com/questions/784929/what-is-the-not-not-operator-in-javascript
        // It's a way of making something a boolean.
        return !!this.done;
    },
    startStepAt: function () {
        'use strict';
        var meal = Session.get('currentMeal'),
            startTime;
        startTime = new Date(meal.serveTime.getTime() - (this.totalDuration * 1000));
        console.log(this.totalDuration);
        console.log(startTime);
        console.log(this);
        console.log(new DateFormat().showFormattedDate(startTime));
        return new DateFormat().showFormattedDate(startTime);
    },
    startStepIn: function () {
        'use strict';

        var meal = Session.get('currentMeal'),
            currTime = Session.get('currentTime'),
            startTime, secondsToGo, timeToGo;
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
    dependsOn: function () {
        'use strict';
        var getSteps = {},
            dependantSteps = [],
            retArr = [],
            desc;
        if (!!this.dependsOn) {
            getSteps = Steps.find({
                _id: {
                    $in: this.dependsOn
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
    hasDependancy: function () {
        'use strict';
        return !!this.dependsOn;
    }
});
Template.stepItem.events({
    'click .toggleDone': function (e) {
        'use strict';
        e.preventDefault();
        Meteor.call('toggleDone', this._id);
    }
});
