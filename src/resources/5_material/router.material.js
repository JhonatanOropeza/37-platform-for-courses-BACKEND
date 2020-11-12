const express = require('express');
const materialRouter = express.Router();
const materialController = require('./controller.material'); 

materialRouter.get('/',materialController.materialPrueba);

module.exports = materialRouter;