module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
    testMatch: [
      '**/tests/test1.js'
    ],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
      '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    setupFilesAfterEnv: ["jest-extended"]
};