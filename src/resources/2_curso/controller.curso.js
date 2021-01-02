const cursoController = {};
const Curso = require('./model.curso');
const Inscripcion = require('../1_alumno_inscrip/model.inscripcion');

cursoController.cursoPrueba = (req, res) => {
    res.status(200).send({ message: 'cursoPrueba' })
}
cursoController.cursoPruebaAuth = (req, res) => {
    res.status(200).send({ message: 'cursoPruebaAuth' })
}

cursoController.post_Curso = async (req, res) => {
    const { nombre, categoria, linkOfIcon } = req.body;
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
        linkOfIcon
    });
    try {
        let result = await cursoToSave.save();
        res.status(200).send({ message: 'Curso saved', result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error to save the course' })
    }
}

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

cursoController.get_CursoYesUser = async (req, res) => {
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

//Para l sección de avances
cursoController.get_cursosDelAlumno = async (req, res) => {
    const idAlumno = req.user._id;
    console.log(idAlumno);
    const result = await Inscripcion.find({alumno: idAlumno}).populate('curso','_id nombre');
    return res.status(200).send({ message: 'get_cursosDelAlumno', result });
}

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