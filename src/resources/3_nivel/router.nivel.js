const express = require('express');
const nivelRouter = express.Router();
const nivelController = require('./controller.nivel'); 

nivelRouter.get('/',nivelController.nivelPrueba);

module.exports = nivelRouter;