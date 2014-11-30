if (Steps.find().count() === 0) {
    Steps.insert({
        description: 'Prepare turkey',
        duration: 1800
    });

    Steps.insert({
        description: 'Warm oven',
        duration: 600
    });

    Steps.insert({
        description: 'Turkey in oven at 200C',
        duration: 9900
    });
}