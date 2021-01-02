const alumnoController = {};
const Inscripcion = require('./model.inscripcion');
const Curso = require('../../resources/2_curso/model.curso')
const moment = require('moment');

// ----------------------------------------------------------------
//                         Proof controllers
// ----------------------------------------------------------------
alumnoController.alumnoPrueba = (req, res) => {
    res.status(200).send({ message: 'alumnoPrueba' })
}
alumnoController.logFacebook = (req, res) => {
    res.status(200).send(req.user)
}
alumnoController.logGoogle = (req, res) => {
    res.status(200).send(req.user)
}
alumnoController.testingMultipleStrategies = (req, res) => {
    res.status(200).send({ message: 'testingConMultipleStrategies', user: req.user })
}
// ----------------------------------------------------------------
//                         Inscripcion controllers
// ----------------------------------------------------------------
alumnoController.realizarInscripcion = async (req, res) => {
    const idCurso = req.params.id;
    const idUser = req.user._id;
    var inscripcion = new Inscripcion();
    inscripcion.alumno = idUser;
    inscripcion.curso = idCurso;
    inscripcion.fechaInscripcion = moment().format();

    const curso = await Curso.find({ _id: idCurso })
        .populate({
            path: 'NIVELES',
            populate: {
                path: 'LECCIONES',
                populate: {
                    path: 'MATERIALES'
                }
            }
        });
    const result = await inscripcion.save();
    if (!result) return res.status(422).send({ message: 'La publicación NO ha sido guardada' });
    return res.status(200).send({ message: 'Inscripción realizada', result });
}

alumnoController.identificarInscripcion = async (req, res) => {
    try {
        const idCurso = req.params.id;
        const idUser = req.user._id;
        const result = await Inscripcion.find({ alumno: idUser, curso: idCurso });
        return res.status(200).send({ message: 'result', result });
    } catch (error) {
        console.log(erro);
        return res.status(401).send({ message: 'Server Error'});
    }
}

module.exports = alumnoController;