const express = require('express');
const passport = require('passport');
const ZRA = express.Router();
const authZRA = express.Router();
const materialAlumnoController = require('../controllers/ZRelacionesAlumno.controller');

//http://localhost:3001/api/ZRA/auth
ZRA.use('/auth',
    passport.authenticate(['jwt', 'facebook-token', 'google-token']),
    authZRA)
authZRA.get('/materialAlumno',materialAlumnoController.prueba_materialAlumnos);
authZRA.post('/materialAlumno/post_materialAlumno/:id', materialAlumnoController.post_materialAlumnos);
authZRA.post('/materialAlumno/post_materialAlumnoExamen/:id',materialAlumnoController.post_materialAlumnosExamen);

module.exports = ZRA;