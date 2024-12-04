// jest.config.js
module.exports = {
    testEnvironment: 'jsdom', // Use jsdom for testing React components
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // Use babel-jest for transforming files
    },
};