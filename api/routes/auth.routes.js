var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/auth.controller');
const Token = require('../controllers/verifyToken')

router.post('/users', AuthController.register)

router.post('/login', AuthController.login)

router.get('/logout', AuthController.logout)

router.get('/users',  AuthController.users);

router.delete('/users/:id',  AuthController.removeUser);

router.get('/me', Token.verifyToken,  AuthController.me);


module.exports = router;