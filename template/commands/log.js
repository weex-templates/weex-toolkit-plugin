// build log command
module.exports = {
  name: 'log',
  description: 'My first Weex Toolkit Plugin',
  alias: 'l',
  run: (context) => {
    context.log('My first Weex Toolkit Plugin')
  }
}