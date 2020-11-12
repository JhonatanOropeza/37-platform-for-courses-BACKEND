const alumnoController = {};

alumnoController.alumnoPrueba = (req, res) => {
    res.status(200).send({message:'Hola desde alumnoPrueba'})
}

alumnoController.alumnoAutenticadoFacebook = (req, res) => {
    res.status(200).json({message:'Inside with Facebook'})
}

module.exports = alumnoController;