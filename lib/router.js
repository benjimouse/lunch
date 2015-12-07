/*jslint node:true*/
// Configuring
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        'use strict';
        return [Meteor.subscribe('steps'), Meteor.subscribe('meals')];
    }
});

// Routes
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
Router.route('/steps/:_id/edit', {
    name: 'stepEdit',
    data: function () {
        'use strict';
        return Steps.findOne(this.params._id);
    }
});
Router.route('/meals/:_id', {
    name: 'mealPage',
    data: function () {
        'use strict';
        return Meals.findOne(this.params._id);
    }
});
Router.route('/stepSubmit', {
    name: 'stepSubmit'
});
Router.route('/mealSubmit', {
    name: 'mealSubmit'
});

// Functions to do with routing
var requireLogin = function () {
    'use strict';
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

// onBeforeActions
Router.onBeforeAction('dataNotFound', {
    only: 'stepPage'
});

Router.onBeforeAction(requireLogin, {
    only: 'stepSubmit',
    only: 'mealSubmit'
});