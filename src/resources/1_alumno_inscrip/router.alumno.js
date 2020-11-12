const express = require('express');
const passport = require('passport');
const alumnoRouter = express.Router();
const alumnoController = require('./controller.alumno'); 

//Facebook_Passport
require('../../libs/passport_FB');
const PAuthFace = passport.authenticate('facebook', {session: false});

alumnoRouter.get('/',alumnoController.alumnoPrueba);
alumnoRouter.get('/access', PAuthFace);
alumnoRouter.get('/access/callback',alumnoController.alumnoAutenticadoFacebook);
module.exports = alumnoRouter;