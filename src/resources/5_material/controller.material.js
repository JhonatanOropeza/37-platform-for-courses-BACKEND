const materialController = {};
const Material = require('./model.material');

materialController.materialPrueba = (req, res) => {
    res.status(200).send({message:'Hola desde materialPrueba'})
}

materialController.post_MaterialAlumno = async (req, res) => {
    const idLeccion = req.params.id;
    const {nombre, tipo} = req.body;
    if(!nombre){
        return res.status(422).send({
            message: 'Enter complete data'
        });
    }
    const materialToSave = new Material({
        nombre,
        estatus: false,
        tipo,
        idLeccion 
    });
    try {
        let result = await materialToSave.save();
        res.status(200).send({message:'Material saved', result});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Error to save the material'})
    }
}

module.exports = materialController;