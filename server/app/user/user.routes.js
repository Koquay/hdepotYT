const router = require('express').Router();
const userController = require('./user.controller');

router.post('/', userController.signUp)
// router.put('/signout', userController.signOut)
router.put('/', userController.signIn)

module.exports = router;