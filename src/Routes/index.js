const { Router } = require("express");

const usersRouter = require("./user.routes");
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.routes");
const sessionsRouter = require("./sessions.routes");



const routes = Router();

routes.use("/users", usersRouter); // quando for acessada essa rota levara para o userRoutes 
routes.use("/notes", notesRouter); 
routes.use("/tags", tagsRouter); 
routes.use("/sessions", sessionsRouter); 
 

module.exports = routes;