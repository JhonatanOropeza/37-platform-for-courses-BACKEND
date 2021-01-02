const express = require('express');
const passport = require('passport');
const alumnoRouter = express.Router();
const alumnoAuth = express.Router();
const alumnoControllerJWT = require('./controller.JWT');
const alumnoController = require('./controller.alumno');
const whoAmI = require('../../config/passport/whoAmI')

require('../../config/passport/passport_JWT');
const PAuthToken = passport.authenticate('jwt', { session: false });
require('../../config/passport/passport_FB');
const PAuthFacebook = passport.authenticate('facebook-token', { session: false });
require('../../config/passport/passport_Google');
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
// -----------------------------------------
// -----------------------------------------
// 2.- LOG with FACEBOOK ang GOOGLE
// -----------------------------------------
// -----------------------------------------
alumnoRouter.post('/authFB/log/token?', PAuthFacebook, alumnoController.logFacebook);
alumnoRouter.post('/authGoogle/log/token?', PAuthGoogle, alumnoController.logGoogle);
// -----------------------------------------
// -----------------------------------------
// 2.- CONTROLLER FOR AN AUTENTICATED ALUMN  
// -----------------------------------------
// -----------------------------------------
alumnoRouter.use('/auth',
    passport.authenticate(['jwt', 'facebook-token','google-token']), 
    alumnoAuth);
//http://localhost:3001/api/alumno/auth
alumnoAuth.get('/getUser',alumnoController.testingMultipleStrategies);
alumnoAuth.get('/whoami',whoAmI.userInformation);
alumnoAuth.post('/realizarInscripcion/:id', alumnoController.realizarInscripcion);
alumnoAuth.get('/identificarInscripcion/:id', alumnoController.identificarInscripcion);

module.exports = alumnoRouter;