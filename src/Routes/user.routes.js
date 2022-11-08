const { Router } = require('express');
const UsersController = require('../Controllers/userController');
const UsersAvatarController = require('../Controllers/userAvatarController');
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();
const userRoutes = Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const uploadConfig = require('../configs/upload');
const multer = require('multer');
const upload = multer(uploadConfig.MULTER);


userRoutes.post("/", usersController.create);
userRoutes.put("/", ensureAuthenticated,  usersController.update);
userRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersAvatarController.update)

module.exports = userRoutes;







