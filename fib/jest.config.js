module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    reporters: [
        'default',
        [
            'jest-junit',
            {
                suiteName: 'Server tests',
                outputDirectory: './reports',
                outputName: 'server.xml',
            },
        ],
    ],
};
