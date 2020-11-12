const express = require('express');
const preguntaRouter = express.Router();
const preguntaController = require('./controller.pregunta'); 

preguntaRouter.get('/pregunta',preguntaController.preguntaPrueba);

module.exports = preguntaRouter;