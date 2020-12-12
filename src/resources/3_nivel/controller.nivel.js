const nivelController = {};

const Nivel = require('./model.nivel');

nivelController.nivelPrueba = (req, res) => {
    res.status(200).send({message:'Hola desde nivelPrueba'})
}

nivelController.post_Nivel = async (req, res) => {
    const idCurso = req.params.id;
    const { nombre} = req.body;
    //1.1 Validating form
    if(!nombre){
        return res.status(422).send({
            message: 'Enter complete data'
        });
    }
    //1.2 Validating that the data isn´t repeated
    const nivelToSave = new Nivel({
        nombre,
        estatus: false,
        idCurso
    });
    try {
        let result = await nivelToSave.save();
        res.status(200).send({message:'Level saved', result});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Error to save the level'})
    }
}
module.exports = nivelController;