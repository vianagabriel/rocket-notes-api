const AppError = require('../Utils/AppError');
const sqliteConnection = require('../Database/sqlite');
const { hash } = require = require('bcryptjs');

class UsersController{
  async create(request, response){
      const { name, email, password } = request.body;
      const database = await sqliteConnection();
      const checkUserExistis = await database.get('SELECT * FROM users WHERE email = (?)',[email]);

      if(checkUserExistis){
         throw new AppError('Este e-mail já está em uso.');
      }

      const hashedPassword = await hash(password, 8);

      await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',[name, email, hashedPassword]);

      return response.status(201).json();
   }
};

module.exports = UsersController;


     