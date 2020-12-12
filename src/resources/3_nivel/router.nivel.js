const express = require('express');
const nivelRouter = express.Router();
const nivelController = require('./controller.nivel'); 

//http://localhost:3001/api/nivel
nivelRouter.get('/',nivelController.nivelPrueba);

nivelRouter.post('/crearNuevoNivel/:id', nivelController.post_Nivel);

module.exports = nivelRouter;