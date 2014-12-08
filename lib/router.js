Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        'use strict';
        return Meteor.subscribe('steps');
    }
});

Router.route('/', {
    name: 'stepsList'
});
Router.route('/steps/:_id', {
    name: 'stepPage',
    data: function () {
        'use strict';
        return Steps.findOne(this.params._id);
    }
});
Router.onBeforeAction('dataNotFound', {
    only: 'stepPage'
});