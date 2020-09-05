module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    reporters: [
        'default',
        [
            'jest-junit',
            {
                suiteName: 'Unit tests',
                outputDirectory: './reports',
                outputName: 'unit.xml',
            },
        ],
    ],
};
