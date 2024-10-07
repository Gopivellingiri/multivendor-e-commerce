/** @type {import('eslint').Linter.FlatConfig} */
const config = [
  {
    languageOptions: {
      globals: {
        // Define your global variables here
        browser: true,
        node: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX
        },
        ecmaVersion: 2021, // Use the latest version of ECMAScript
        sourceType: "module", // Enable ES modules
      },
    },
    rules: {
      // Customize your rules here
    },
    files: ["**/*.js", "**/*.jsx"], // Specify the files you want to lint
  },
];

module.exports = config;
