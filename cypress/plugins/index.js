/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const findWebpack = require('find-webpack')
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  const webpackOptions = findWebpack.getWebpackOptions()

  if (!webpackOptions) {
    throw new Error('Could not find Webpack in this project 😢')
  }

  // if we just pass webpackOptions to the preprocessor
  // it won't work - because react-scripts by default
  // includes plugins that split specs into chunks, etc.
  // https://github.com/cypress-io/cypress-webpack-preprocessor/issues/31

  // solution 1
  // blunt: delete entire optimization object
  // delete webpackOptions.optimization

  // solution 2
  // use a module that carefully removes only plugins
  // that we found to be breaking the bundling
  // https://github.com/bahmutov/find-webpack
  const cleanOptions = {
    reactScripts: true,
  }

  findWebpack.cleanForCypress(cleanOptions, webpackOptions)

  const options = {
    webpackOptions,
    watchOptions: {},
  }

  on('file:preprocessor', webpackPreprocessor(options))
}
