module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
    testMatch: [
      // '**/tests/otus/activity-redesign-test.js',
<<<<<<< HEAD
      '**/tests/otus/activity-indication-test.js'
=======
      '**/tests/pendencyList1.js'
>>>>>>> 0e138445e5c891206a6b960f2ba1d7e29196bb3e
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