const alumnoController = {};

// ----------------------------------------------------------------
//                         Proof controllers
// ----------------------------------------------------------------
alumnoController.alumnoPrueba = (req, res) => {
    res.status(200).send({message:'Hola desde alumnoPrueba'})
}
alumnoController.logFacebook = (req, res) => {
    res.status(200).send( req.user)
}
alumnoController.logGoogle = (req, res) => {
    res.status(200).send( req.user)
}
alumnoController.testingMultipleStrategies = (req, res) => {
    res.status(200).send({message:'Hola desde testingConMultipleStrategies', user: req.user})
}
// ----------------------------------------------------------------
//                         Proof controllers
// ----------------------------------------------------------------

module.exports = alumnoController;