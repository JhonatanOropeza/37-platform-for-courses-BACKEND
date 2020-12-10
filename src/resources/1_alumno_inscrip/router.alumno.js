const express = require('express');
const passport = require('passport');
const alumnoRouter = express.Router();
const alumnoControllerJWT = require('./controller.JWT');
const alumnoController = require('./controller.alumno');

require('../../config/passport_JWT');
const PAuthToken = passport.authenticate('jwt', { session: false });
require('../../config/passport_FB');
const PAuthFacebook = passport.authenticate('facebook-token', { session: false });
require('../../config/passport_Google');
const PAuthGoogle = passport.authenticate('google-token', { session: false });
//http://localhost:3001/api/alumno
alumnoRouter.get('/', alumnoController.alumnoPrueba);

// -----------------------------------------
// -----------------------------------------
// 1.- LOG with JWT
// -----------------------------------------
// -----------------------------------------
alumnoRouter.post('/authJWT/logup', alumnoControllerJWT.logup);
alumnoRouter.post('/authJWT/login', alumnoControllerJWT.login);
alumnoRouter.get('/authJWT/whoami', PAuthToken, alumnoControllerJWT.whoami);
// -----------------------------------------
// -----------------------------------------
// 1.- LOG with FACEBOOK ang GOOGLE
// -----------------------------------------
// -----------------------------------------
alumnoRouter.post('/authFB/log/token?', PAuthFacebook, alumnoController.logFacebook);
alumnoRouter.post('/authGoogle/log/token?', PAuthGoogle, alumnoController.logGoogle);
// -----------------------------------------
// -----------------------------------------
// 2.- CONTROLLER FOR AN AUTENTICATED ALUMN  
// -----------------------------------------
// -----------------------------------------
alumnoRouter.get('/auth/getUser',
    passport.authenticate(['jwt', 'facebook-token']), 
    alumnoController.testingMultipleStrategies)

module.exports = alumnoRouter;