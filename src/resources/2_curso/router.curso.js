const express = require('express');
const cursoRouter = express.Router();
const cursoController = require('./controller.curso'); 

cursoRouter.get('/',cursoController.cursoPrueba);

module.exports = cursoRouter;