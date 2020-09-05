module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    reporters: [
        'default',
        [
            'jest-junit',
            {
                suiteName: 'Worker tests',
                outputDirectory: './reports',
                outputName: 'worker.xml',
            },
        ],
    ],
};
