const { Router } = require('express');
const UsersController = require('../Controllers/userController');
const usersController = new UsersController();
const userRoutes = Router();

userRoutes.post('/', usersController.create);
userRoutes.put('/:id', usersController.update); 

module.exports = userRoutes;



      



