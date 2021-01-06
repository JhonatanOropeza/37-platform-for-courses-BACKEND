
// Register module/require aliases
require('module-alias/register');


// Patches
const {inject, errorHandler} = require('express-custom-error');
inject(); // Patch express in order to use async / await syntax

// Require Dependencies
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('@util/logger');

//For routs
const alumnoRouter = require('./resources/1_alumno_inscrip/router.alumno');
const cursoRouter = require('./resources/2_curso/router.curso');
const nivelRouter = require('./resources/3_nivel/router.nivel');
const leccionRouter = require('./resources/4_leccion/router.leccion');
const preguntaRouter = require('./resources/4.1_pregunta/router.pregunta');
const materialRouter = require('./resources/5_material/router.material');
const ZRA_Router = require('./resources/Z_relaciones_alumno/routers/ZRelacionesAlumnos.router');
// Load .env Enviroment Variables to process.env
require('mandatoryenv').load([
    'DB_URL',
    'PORT',
    'SECRET'
]);

const { PORT } = process.env;

// Instantiate an Express Application
const app = express();
require('./config/database/database');

// Configure Express App Instance
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));

// Configure custom logger middleware
app.use(logger.dev, logger.combined);

app.use(cookieParser());
app.use(cors());
app.use(helmet());

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})

app.use(passport.initialize());

// Assign Routes
app.use('/api/alumno', alumnoRouter);
app.use('/api/curso', cursoRouter);
app.use('/api/nivel', nivelRouter);
app.use('/api/leccion', leccionRouter);
app.use('/api/pregunta', preguntaRouter);
app.use('/api/material', materialRouter)
//http://localhost:3001/api/ZRA/auth
app.use('/api/ZRA',ZRA_Router)

// Handle errors
app.use(errorHandler());

// Handle not valid route
app.use('*', (req, res) => {
    res
    .status(404)
    .json( {status: false, message: 'Endpoint Not Found'} );
})

// Open Server on selected Port
app.listen(
    PORT,
    () => console.info('Server listening on port ', PORT)
);