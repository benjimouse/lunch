Template.stepItem.helpers({
    ownStep: function () {
        'use strict';
        return this.userId === Meteor.userId();
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
        return !!this.done;
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
    }
});
Template.stepItem.events({
    'click .toggleDone': function (e) {
        'use strict';
        e.preventDefault();
        Meteor.call('toggleDone', this._id);
    }
});
