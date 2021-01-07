const express = require('express');
const passport = require('passport');
const cursoRouter = express.Router();
const cursoAuth = express.Router();
const cursoController = require('./controller.curso');

//http://localhost:3001/api/curso
cursoRouter.get('/', cursoController.cursoPrueba);
cursoRouter.post('/crearNuevoCurso', cursoController.post_Curso);
cursoRouter.get('/getCurso/:id', cursoController.get_CursoNoUser);//Curso sin autenticación
cursoRouter.get('/getCursos', cursoController.get_Cursos);
cursoRouter.post('/getCursosPorCategoria', cursoController.get_CursosPorCategoria);

//http://localhost:3001/api/curso/auth
cursoRouter.use('/auth',
    passport.authenticate(['jwt', 'facebook-token', 'google-token']),
    cursoAuth)
cursoAuth.get('/',cursoController.cursoPruebaAuth);
cursoAuth.get('/get_avancesDelAlumno', cursoController.get_avancesDelAlumno);//Para sección de avances
cursoAuth.get('/getCursoOfUser/:id', cursoController.get_CursoYesUser);//Curso con autenticación

module.exports = cursoRouter;