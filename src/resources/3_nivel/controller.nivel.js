const nivelController = {};

nivelController.nivelPrueba = (req, res) => {
    res.status(200).send({message:'Hola desde nivelPrueba'})
}

module.exports = nivelController;