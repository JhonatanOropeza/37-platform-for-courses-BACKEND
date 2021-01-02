const express = require('express');
const passport = require('passport');
const preguntaRouter = express.Router();
const preguntaAuth = express.Router();
const preguntaController = require('./controller.pregunta');

//http://localhost:3001/api/pregunta
preguntaRouter.get('/', preguntaController.preguntaPrueba);
preguntaRouter.post('/post_Pregunta/:id', preguntaController.post_Pregunta);
preguntaRouter.get('/get_preguntasForOneTest/:id', preguntaController.get_PreguntasForOneTest)

//http://localhost:3001/api/pregunta/auth
preguntaRouter.use('/auth',
    passport.authenticate(['jwt', 'facebook-token', 'google-token']),
    preguntaAuth);
preguntaAuth.get('/',preguntaController.preguntaPruebaAuth);
preguntaAuth.post('/qualifyTest/:id', preguntaController.post_QualifyTest);


module.exports = preguntaRouter;