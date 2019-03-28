const path = require('path')
const fs = require('fs')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

const { addTestAnswers } = require('./scenarios')

module.exports = {
  metalsmith: {
    // When running tests for the template, this adds answers for the selected scenario
    before: addTestAnswers
  },
  helpers: {
    unless_eq(v1, v2, options) {
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    },
    if_eq(v1, v2, options) {
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    },
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }
      return options.inverse(this)
    },
    template_version() {
      return templateVersion
    },
  },
  
  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: 'Project name',
    },
    description: {
      when: 'isNotTest',
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A weex project',
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      message: 'Author',
    }
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    console.log(chalk.green('Create Weex Toolkit Plugin template success!'))
  }
}
