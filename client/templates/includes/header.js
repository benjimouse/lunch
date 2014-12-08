Template.header.helpers({
    pageTitle: function () {
        'use strict';
        return Session.get('pageTitle');
    },
totalCookingTime : function () {
    'use strict';
    return Session.get('totalCookingTime');
}
});