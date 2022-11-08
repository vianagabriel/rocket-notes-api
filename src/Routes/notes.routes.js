const { Router } = require('express');

const NotesController = require('../Controllers/notesController');

const notesRoutes = Router();

const notesController = new NotesController();

const ensureAuthenticated = require('../middleware/ensureAuthenticated');

notesRoutes.use(ensureAuthenticated);

notesRoutes.post('/', notesController.create);
notesRoutes.get('/:id', notesController.show);
notesRoutes.delete('/:id', notesController.delete);
notesRoutes.get('/', notesController.index);



module.exports = notesRoutes;
