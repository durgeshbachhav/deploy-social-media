const router = require('express').Router();
const AuthController = require('../controllers/authController')

router.post('/signup', AuthController.SignupController)
router.post('/login', AuthController.LoginController)
router.get('/refresh', AuthController.refreshAccessTokenController)
router.post('/logout', AuthController.logoutController)


module.exports = router