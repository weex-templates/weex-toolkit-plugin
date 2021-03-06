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

module.exports = {
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
      default: 'A Weex Toolkit plugin project',
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      message: 'Author',
    }
  },
  complete: function(data, { chalk }) {
    const green = chalk.green
    console.log(green('Create Weex Toolkit Plugin template success!'))
  }
}
