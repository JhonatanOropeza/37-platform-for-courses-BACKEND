const cursoController = {};

cursoController.cursoPrueba = (req, res) => {
    res.status(200).send({message:'Hola desde cursoPrueba'})
}

module.exports = cursoController;