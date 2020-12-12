const express = require('express');
const materialRouter = express.Router();
const materialController = require('./controller.material'); 

//http://localhost:3001/api/material
materialRouter.get('/',materialController.materialPrueba);

materialRouter.post('/crearNuevoMaterial/:id',materialController.post_Material)

module.exports = materialRouter;