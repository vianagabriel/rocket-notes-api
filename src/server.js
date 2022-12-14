// fazendo a requisição para o express-async-errors para conseguir utilizar o app error
require('express-async-errors');

const AppError = require('./Utils/AppError');
const express = require('express');
const routes = require('./Routes');
const app = express();
const PORT = 3333;
const migrationsRun = require('./Database/sqlite/migrations');
const uploadConfig = require('./configs/upload');

migrationsRun();
app.use(express.json());
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes);


app.use(( error, request, response, next ) => {
   if(error instanceof AppError){
      return response.status(error.statusCode).json({
         status: 'error',
         message: error.message
      })
   }

   console.log(error);

   return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
   })
})

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));



