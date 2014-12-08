if (Steps.find().count() === 0) {
    Steps.insert({
        description: 'Prepare turkey',
        durationInSeconds: 1800
    });

    Steps.insert({
        description: 'Warm oven',
        durationInSeconds: 600
    });

    Steps.insert({
        description: 'Turkey in oven at 200C',
        durationInSeconds: 9900
    });
}