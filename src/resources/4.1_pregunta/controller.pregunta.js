const preguntaController = {};

preguntaController.preguntaPrueba = (req, res) => {
    res.status(200).send({message:'Hola desde preguntaPrueba'})
}

module.exports = preguntaController;