const userService = require('./user.service');

exports.signUp = (req, res) => {
    console.log('UserController.signUp')
    userService.signUp(req, res);
}

exports.signIn = (req, res) => {
    console.log('UserController.signIn')
    userService.signIn(req, res);
}