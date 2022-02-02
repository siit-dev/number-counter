# Example NPM package

This library allows developers to easily create a npm package.

## Before you continue

Please search through all the project and replace "npm-package-template" with your chosen name for the package.

The NPM package is published whenever you change the package versions (using `npm version x.y.z`). The Github Action will be triggered and the package will be published to NPM.

For the Github Action to work, you will need to add a valid NPM token as a "project secret" in Github. The name of the variable should be `NPM_TOKEN`.

## How to install

Install using `npm` or `yarn`

```npm2yarn
npm install --save @smartimpact-it/npm-package-template
```

## How to use
