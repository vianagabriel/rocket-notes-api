const knex = require('../Database/knex');
const AppError = require('../Utils/AppError');
const DiskStorage = require('../Providers/DiskStorage');

class UserAvatarController {
  async update(request, response){
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;
    const diskStorage = new DiskStorage();

    const user = await knex('users').where({ id: user_id }).first();

    if(!user){
     throw new AppError('Somente usuários autenticados podem mudar o avatar', 401);
    }

    if(user.avatar){
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFilename);
    user.avatar = filename;

    await knex('users').update(user).where({ id: user_id });

    return response.json(user)
  }
}

module.exports = UserAvatarController;