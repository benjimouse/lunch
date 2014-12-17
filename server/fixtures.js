if (Steps.find().count() === 0) {
    Steps.insert({
        description: 'Prepare turkey',
        durationInSeconds: 1800,
        done: true
    });

    Steps.insert({
        description: 'Warm oven',
        durationInSeconds: 600,
        done: false
    });

    Steps.insert({
        description: 'Turkey in oven at 200C',
        durationInSeconds: 9900,
        done: false
    });
}
