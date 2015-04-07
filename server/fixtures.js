if (Steps.find().count() === 0) {
    var currDate = new Date(),
        now = currDate.getTime();
    // create two users
    var benId = Meteor.users.insert({
        profile: {
            name: 'Ben Best'
        }
    });
    var ben = Meteor.users.findOne(benId);
    var simoneId = Meteor.users.insert({
        profile: {
            name: 'Simone Best'
        }
    });
    var simone = Meteor.users.findOne(simoneId);
    var christmasLunchId = Meals.insert({
        title: 'Christmas Lunch',
        userId: ben._id,
        author: ben.profile.name,
        submitted: new Date(now - 7 * 3600 * 1000),
        serveTime: new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + 1, 18, 30)
    });

    prepareTurkeyId = Steps.insert({
        mealId: christmasLunchId,
        userId: ben._id,
        author: ben.profile.name,
        submitted: new Date(now - 5 * 3600 * 1000),
        description: 'Prepare turkey',
        durationInSeconds: 1800,
        doneBeforeDuration: 0,
        totalDuration: 1800,
        done: true
    });

    Steps.insert({
        mealId: christmasLunchId,
        userId: ben._id,
        author: ben.profile.name,
        submitted: new Date(now - 1 * 3600 * 1000),
        description: 'Warm oven',
        durationInSeconds: 600,
        doneBeforeDuration: 1800,
        totalDuration: 2400,
        doneBefore: [prepareTurkeyId],
        done: false
    });

    Steps.insert({
        mealId: christmasLunchId,
        userId: ben._id,
        author: ben.profile.name,
        submitted: new Date(now - 6 * 3600 * 1000),
        description: 'Turkey in oven at 200C',
        durationInSeconds: 9900,
        doneBeforeDuration: 0,
        totalDuration: 9900,
        done: false
    });
}