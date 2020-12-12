const express = require('express');
const cursoRouter = express.Router();
const cursoController = require('./controller.curso'); 

//http://localhost:3001/api/curso
cursoRouter.get('/',cursoController.cursoPrueba);

cursoRouter.post('/crearNuevoCurso',cursoController.post_Curso);
cursoRouter.get('/getCurso/:id',cursoController.get_Curso);

module.exports = cursoRouter;