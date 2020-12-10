// -----------------------------------------
// GENERARCIÓN DE TOKEN EN SIGNIN Y SIGNUP
// -----------------------------------------
const AuthCtrl = {}
const jwt = require('jsonwebtoken')
const User = require('./model.alumno')

// -----------------------------------------
// 0.- Different functions
// -----------------------------------------
//Generando token
function generateToken(user) {
    return jwt.sign(user, 'secret', {
        expiresIn: 60 * 60 * 24
    });
}
//Normalizando la información
function normalizeInfo(req) {
    return {
        _id: req._id,
        nombre: req.nombre,
        correo: req.correo
    };
}

// -----------------------------------------
// 1.- Function for logup
// -----------------------------------------
AuthCtrl.logup = async (req, res) => {
    const { nombre, apellidos, correo, contrasena,  } = req.body;
    //Validating form
    if (!nombre || !apellidos || !correo || !contrasena) {
        return res.status(422).send({
            message: 'Complete todos los campos del formulario'
        })
    }
    //1.2 Validating that the data isn´t repeated
    const userRepeated = await User.findOne({ correo: correo });
    if (userRepeated) {
        return res.status(422).send({
            message: 'El email ya fue registrado anteriormente. Use otro correo.'
        })
    }
    //1.3 Creating the new document in bd
    let newUser = new User();
    newUser.nombre = nombre;
    newUser.apellidos = apellidos;
    newUser.correo = correo;
    newUser.tipoDeAutenticacion = "JWT";
    newUser.contrasena = newUser.encryptPassword(contrasena);
    //1.4 Trying to save the new object in db
    
    await newUser.save(function (err, user) {
        if (err) {
            return next(err);
        }
        const userInfo = normalizeInfo(user);
        //I the singup was succesfully, yhe next infromation will be sent
        res.status(201).json({
            message: `El usuario con el correo "${correo}" fue exitosamente registrado. Ahora puede inicar sesión.`,
            user: userInfo
        });
    })
};
// -----------------------------------------
// 2.- Function for login
// -----------------------------------------
AuthCtrl.login = async (req, res) => {
    const {correo, contrasena } = req.body;
    //Validating form
    if (!correo || !contrasena) {
        return res.status(422).send({
            message: 'Ingrese todos los datos del formulario'
        })
    }
    //1.2 Validating user
    //1.2 Validating user
    const userFound = await User.findOne({ correo: correo });
    if (!userFound) {
        //true
        return res.status(400).send({ message: 'Datos incorrectos. Intente de nuevo'});
    }
    const result = await userFound.comparePassword(contrasena);
    if (!result) {
        return res.status(400).send({ message: 'Datos incorrectos. Intente de nuevo'});
    }
    let userInfo = normalizeInfo(userFound);
    res.status(201).json({
        token: generateToken(userInfo),
        user: userInfo
    });
}
// -----------------------------------------
// 3.- Who Am I?
// -----------------------------------------
AuthCtrl.whoami = (req, res) => {
    let userInfo = normalizeInfo(req.user);
    res.json({
        user: userInfo
    })
}

module.exports = AuthCtrl;