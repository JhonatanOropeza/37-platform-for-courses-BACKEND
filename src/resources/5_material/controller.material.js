const materialController = {};

materialController.materialPrueba = (req, res) => {
    res.status(200).send({message:'Hola desde materialPrueba'})
}

module.exports = materialController;