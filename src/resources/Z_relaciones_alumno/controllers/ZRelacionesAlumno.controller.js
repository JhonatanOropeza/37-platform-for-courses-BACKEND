const zRelacionesAlumnos = {}
const alumnoMaterial = require('../models/material.Alumno');
const Inscripcion = require('../../1_alumno_inscrip/model.inscripcion');
const { buscarID_DeMaterialesEnCurso } = require('../../../helpers/curso-helpers');

zRelacionesAlumnos.prueba_materialAlumnos = async (req, res) => {
    res.status(200).send({ message: 'materialAlumnos' });
}
zRelacionesAlumnos.post_materialAlumnos = async (req, res) => {
    //What we use for the queries
    const idUser = req.user._id;
    const idMaterial = req.params.id;
    const calificacionExamen = req.body.calificacionExamen;//Al no ser Examen, estará como undefined

    //1.- Searching if materialAlumno already exists
    const search = await alumnoMaterial.findOne({ idUser, idMaterial })
    //1.2- Notifying if materialAlumno already exists
    if (search) {
        return res.status(409).send({ message: "materialAlumno already registered" });
    }
    //2.- Saving the materialAlumno
    try {
        await new alumnoMaterial({
            idUser,
            idMaterial,
            calificacionExamen
        }).save();
        return res.status(200).send({ message: 'materialAlumnos saved' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server didn´t saved the resource materialAlumno' })
    }
}

zRelacionesAlumnos.post_materialAlumnosExamen = async (req, res) => {
    let mensajeFinal= "";
    let result;
    const idMaterial = req.params.id;
    const idUser = req.user._id;
    const calificacionExamen = req.body.calificacion;
    //1.- Searching if materialAlumno already exists
    const busquedaMaterialExamen = await alumnoMaterial.findOne({ idUser, idMaterial });
    //2.1.- If materialAlumno already exists, we update the document with new qualification
    if (busquedaMaterialExamen) {
        try {
            await alumnoMaterial.updateOne({ idUser, idMaterial }, {
                $set: {
                    calificacionExamen
                }
            });
            result = await alumnoMaterial.findOne({ idUser, idMaterial });
            mensajeFinal = "Examen with new qualification";
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Error al calificar examen (1)" });
        }
    } else {
        //2.2.- The materialAlumno doesn´t exist, we create it
        try {
            result = await new alumnoMaterial({
                idUser,
                idMaterial,
                calificacionExamen
            }).save();
            mensajeFinal= "MaterialAlumno FOR EXAMEN saved";
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Server didn´t saved the resource materialAlumno FOR EXAMEN' })
        }
    }

    //--------------------------------------------------------------
    //--------------Inicia SECCIÓN ESPECIAL ------------------------
    //------ Modificar promedio a la inscripción del alumno --------
    //--------------------------------------------------------------
    const inscripcionesDelAlumno = await Inscripcion.find({ alumno: idUser });
    const IDs_inscripcionesDelAlumno = inscripcionesDelAlumno.map(inscrip => inscrip.curso);
    console.log('Hola',IDs_inscripcionesDelAlumno);
    //--------------------------------------------------------------
    //--------------Termina SECCIÓN ESPECIAL -----------------------
    //------ Modificar promedio a la isncripción del alumno --------
    //--------------------------------------------------------------
    res.status(200).send({ message: mensajeFinal, result });
}
module.exports = zRelacionesAlumnos;