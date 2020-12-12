const cursoController = {};
const Curso = require('./model.curso');
const Nivel = require('../3_nivel/model.nivel')

cursoController.cursoPrueba = (req, res) => {
    res.status(200).send({ message: 'Hola desde cursoPrueba' })
}

cursoController.post_Curso = async (req, res) => {
    const { nombre, categoria } = req.body;
    //1.1 Validating form
    if (!nombre || !categoria) {
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
        categoria
    });
    try {
        let result = await cursoToSave.save();
        res.status(200).send({ message: 'Curso saved', result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error to save the course' })
    }
}

cursoController.get_Curso = async (req, res) => {
    const idCurso = req.params.id;
    const result = await Curso.find({ _id: idCurso })
        .populate({
            path: 'NIVELES',
            populate:{
                path: 'LECCIONES',
                populate:{
                    path: 'MATERIALES'
                }
            }
        });
    if (!result) {
        return res.status(404).send({ message: 'There´s no course with the id selected' });
    }

    res.status(200).send({ message: 'result', result });

}

module.exports = cursoController;