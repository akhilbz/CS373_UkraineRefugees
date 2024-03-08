module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.test.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
        "^.+\.js$": "babel-jest",
        "^.+\.jsx$": "babel-jest" 
    },
}