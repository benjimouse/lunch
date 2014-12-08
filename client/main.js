if (!Session.get('pageTitle')) {
    Session.set('pageTitle', 'Lunch');
}
//TODO: review this, could (should?) use the spacebars functionality for this.
Tracker.autorun(function () {
    'use strict';
    document.title = Session.get('pageTitle');
});