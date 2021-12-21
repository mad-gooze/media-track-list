module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testPathIgnorePatterns: ['dist'],
    setupFilesAfterEnv: ['jest-extended/all'],
    testEnvironment: 'jsdom',
};
