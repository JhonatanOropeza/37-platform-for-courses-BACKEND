const whoamiCTRL = {}
//Normalizando la información
function normalizeInfo(req) {
    return {
        _id: req._id,
        nombre: req.nombre,
        apellidos: req.apellidos,
        correo: req.correo
    };
}

whoamiCTRL.userInformation = (req, res) => {
    let userInfo = normalizeInfo(req.user);
    res.json({ user: userInfo });
}

module.exports = whoamiCTRL;