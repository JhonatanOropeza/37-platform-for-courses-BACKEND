const leccionController = {};
const Leccion = require('./model.leccion')

leccionController.leccionPrueba = (req, res) => {
    res.status(200).send({message:'Hola desde leccionPrueba'})
}

leccionController.post_Leccion = async (req, res) => {
    const idNivel = req.params.id;
    const { nombre } = req.body;
    //1.1 Validating form
    if(!nombre){
        return res.status(422).send({
            message: 'Enter complete data'
        });
    }
    //1.2 Validating that the data isn´t repeated
    const leccionToSave = new Leccion({
        nombre,
        estatus: false,
        calificacion: 0,
        idNivel
    });
    try {
        let result = await leccionToSave.save();
        res.status(200).send({message:'Level saved', result});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Error to save the lesson'})
    }
}
module.exports = leccionController;