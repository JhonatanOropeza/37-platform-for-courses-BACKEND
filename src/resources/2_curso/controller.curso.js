const cursoController = {};
const Curso = require('./model.curso');
const Inscripcion = require('../1_alumno_inscrip/model.inscripcion');
const materialAlumno = require('../Z_relaciones_alumno/models/material.Alumno');
const {
    buscarID_DeMaterialesEnCurso,
    recorridoEnCursosDelAlumno,
    agregarALosCursosDelAlumnoSuPromedio} = require('../../helpers/curso-helpers');

cursoController.cursoPrueba = (req, res) => {
    res.status(200).send({ message: 'cursoPrueba' })
}
cursoController.cursoPruebaAuth = (req, res) => {
    res.status(200).send({ message: 'cursoPruebaAuth' })
}

cursoController.post_Curso = async (req, res) => {
    const { nombre, categoria, linkOfIcon, descripcion, contenido, linkVideo } = req.body;
    //1.1 Validating form
    if (!nombre || !categoria || !linkOfIcon) {
        return res.status(422).send({
            message: 'Enter complete data'
        });
    }
    //1.2 Validating that the data isn´t repeated
    const cursoRepeated = await Curso.findOne({ nombre: nombre });
    if (cursoRepeated) {
        return res.status(422).send({
            message: 'The name of the course was already taken, try with a new name'
        });
    }
    //1.3 Trying to save the new object in db
    const cursoToSave = new Curso({
        nombre,
        categoria,
        linkOfIcon,
        descripcion,
        contenido,
        linkVideo
    });
    try {
        let result = await cursoToSave.save();
        res.status(200).send({ message: 'Curso saved', result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error to save the course' })
    }
}

//----------------------------------------------------------------
//--------------------- Getting COURSE----------------------------
//----------------------------------------------------------------
cursoController.get_CursoNoUser = async (req, res) => {
    const idCurso = req.params.id;
    const result = await Curso.findOne({ _id: idCurso })
        .populate({
            path: 'NIVELES',
            populate: {
                path: 'LECCIONES',
                populate: {
                    path: 'MATERIALES'
                }
            }
        });
    if (!result) {
        return res.status(404).send({ message: 'There´s no course with the id selected' });
    }
    res.status(200).send({ message: 'result', result });
}

//--------------------- Getting COURSE with USER----------------------------
cursoController.get_CursoYesUser = async (req, res) => {
    const idUser = req.user._id;
    const idCurso = req.params.id;
    //1.- Traer información del curso
    const cursoOriginal = await Curso.findOne({ _id: idCurso })
        .populate({
            path: 'NIVELES',
            populate: {
                path: 'LECCIONES',
                populate: {
                    path: 'MATERIALES'
                }
            }
        });
    //1.2.- Si no hay resultado, enviamos notificación
    if (!cursoOriginal) {
        return res.status(404).send({ message: 'There´s no course with the id selected' });
    }
    //2.- Buscamos los id de los materiales del curso
    let idMateriales = []
    let NIVELES = cursoOriginal.NIVELES;
    idMateriales = buscarID_DeMaterialesEnCurso(NIVELES);

    //3.- Buscamos los materiales vistos por el alumno
    const materialesVistos = await materialAlumno.find({
        idUser,
        idMaterial: { $in: idMateriales }
    });
    //3.- Obtenemos los id de materialesVistos
    const idDeMaterialesVistos = materialesVistos.map(materialVisto => {
        return (
            //Regresamos el Id de... y su calficación en caso de que sea Examen
            [materialVisto.idMaterial, materialVisto.calificacionExamen]
        );
    });
    //4.- Modificamos el estado de materiales, dependiendo de la busqueda anterior
    nivelesActualizados = await modificarEstadoDeMateriales(NIVELES, idDeMaterialesVistos);
    //5.- En el curso a enviar, cambiamos los niveles por los nivelesActualizados
    //que contienen los materiales con los estados propios del alumno de
    var aux = {};
    aux = cursoOriginal;
    delete aux.NIVELES;
    aux.NIVELES = nivelesActualizados;
    let result = aux;
    //6.- Enviamos respuesta
    res.status(200).send({ message: 'result', result });
}

async function modificarEstadoDeMateriales(niveles, idDeMaterialesVistos) {
    //1.- Iterando para llegar a cada material
    niveles.forEach((nivel => {
        nivel.LECCIONES.forEach(leccion => {
            leccion.MATERIALES.forEach(material => {
                //Manejamos los materiales de tipo 1, 2 y 3 (No son examne)
                if (material.tipo === 1 || material.tipo === 2 || material.tipo === 3) {
                    // 1.2.- ALGÚN id de materiales vistos COINCIDE con material._id que se recorre actualmente
                    if (idDeMaterialesVistos.some(id => id[0].equals(material._id))) {
                        //console.log(id);
                        material.estado = -1;
                    }
                }
                //Manejamos los materiales de tipo examen (tipo 4)
                if (material.tipo === 4) {
                    idDeMaterialesVistos.forEach((arreglo, i) => {
                        if (material._id.equals(arreglo[0])) {
                            material.estado = arreglo[1];
                        }
                    })
                }
            })
        })
    }));
    return niveles;
}
//----------------------------------------------------------------
//------------------END Getting COURSE----------------------------
//----------------------------------------------------------------

//-------------a---v--v----a---n--n---ccc--eeee--ssss-------------
//------------a-a--v-v----a-a--n-nn--c-----ee-----ss--------------
//-----------a--a---v----a--a--n--n---ccc--eeee--sss--------------
cursoController.get_avancesDelAlumno = async (req, res) => {
    const idUser = req.user._id;
    //1.- Buscamos los cursos a los que esta inscrito el alumno del
    const cursosDelAlumno = await Inscripcion.find({ alumno: idUser });
    const IDs_cursosDelAlumno = cursosDelAlumno.map(curso => curso.curso);
    //2.- Buscamos los materialesAlumnos tipo 4
    const materialesAlumno = await materialAlumno.find({ idUser });
    let materialesAlumnoTipoExamen = []
    let aux = 0;
    materialesAlumno.forEach((material, i) => {
        if (material.calificacionExamen >= 0) {
            materialesAlumnoTipoExamen[aux] = material;
            aux++;
        }
    });
    //3.- Solicitamos los cursos a los que el alumno esta inscrito,
    //cada curso contiene sus respectivos materiales
    const cursosCompletosDelAlumno = await Curso.find({ _id: { $in: IDs_cursosDelAlumno } }, '_id').populate({
        path: 'NIVELES',
        populate: {
            path: 'LECCIONES',
            populate: {
                path: 'MATERIALES'
            }
        }
    });;
    //4.- Iteramos en cada curso para coincidir entre 
    //materialAlumno === material del curso, si conicide sumamos y sumamos las calficaciones de los examenes presentados
    const ctrlEstadisticasDelAlumno = recorridoEnCursosDelAlumno(cursosCompletosDelAlumno, materialesAlumnoTipoExamen)
    //5.- Agregamos promedios
    const cursosDelAlumnoSinPopular = await Curso.find({ _id: { $in: IDs_cursosDelAlumno } }, 'nombre categoria linkOfIcon totalNiveles totalLecciones',{lean: true});
    const result = agregarALosCursosDelAlumnoSuPromedio(cursosDelAlumnoSinPopular, ctrlEstadisticasDelAlumno);

    return res.status(200).send({ message: 'get_cursosDelAlumno', result });
}
//-------------------------
//-------------a---v--v----a---n--n---ccc--eeee--ssss-------------
//------------a-a--v-v----a-a--n-nn--c-----ee-----ss--------------
//-----------a--a---v----a--a--n--n---ccc--eeee--sss--------------
cursoController.get_Cursos = async (req, res) => {
    try {
        const result = await Curso.find();
        if (!result) {
            res.status(404).send({ message: 'No courses stored' })
        }
        res.status(200).send({ message: 'result', result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server error' });
    }
}

cursoController.get_CursosPorCategoria = async (req, res) => {
    const categoria = req.body.categoria;
    try {
        const result = await Curso.find({ categoria });
        res.status(200).send({ message: 'result', result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server error' });
    }
}


module.exports = cursoController;