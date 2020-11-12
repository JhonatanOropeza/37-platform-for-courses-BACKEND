const leccionController = {};

leccionController.leccionPrueba = (req, res) => {
    res.status(200).send({message:'Hola desde leccionPrueba'})
}

module.exports = leccionController;