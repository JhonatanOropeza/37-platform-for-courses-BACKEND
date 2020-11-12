const express = require('express');
const leccionRouter = express.Router();
const leccionController = require('./controller.leccion'); 

leccionRouter.get('/',leccionController.leccionPrueba);

module.exports = leccionRouter;