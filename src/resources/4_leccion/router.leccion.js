const express = require('express');
const leccionRouter = express.Router();
const leccionController = require('./controller.leccion'); 

//http://localhost:3001/api/leccion
leccionRouter.get('/',leccionController.leccionPrueba);

leccionRouter.post('/crearNuevaLeccion/:id', leccionController.post_Leccion)

module.exports = leccionRouter;