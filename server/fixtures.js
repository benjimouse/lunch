if (Posts.find().count() === 0) {
    Posts.insert({
        title: 'Start cooking the Turkey',
        url: 'http://sachagreif.com/introducing-telescope/'
    });

    Posts.insert({
        title: 'Put it in the oven',
        url: 'http://meteor.com'
    });

    Posts.insert({
        title: 'Take it out',
        url: 'http://themeteorbook.com'
    });
}