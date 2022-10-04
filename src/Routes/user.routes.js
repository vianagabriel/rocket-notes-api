const { Router } = require('express');
const UsersController = require('../Controllers/userController');
const usersController = new UsersController();
const userRoutes = Router();

userRoutes.post('/', usersController.create)

module.exports = userRoutes;



      



