// attach context api
module.exports = context => {
  context.log = (message) => {
    console.log('Welcome to Weex Toolkit')
    console.log(message)
  }
}