const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    nombre: String,
    apellidos: String,
    correo: String,
    tipoDeAutenticacion: String,
    contrasena: String,    
    facebookId: String,
    googleId: String,
    imagen: String
});

//METHODS
// 1.- To encrypt password
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

//2.- To compare password
userSchema.methods.comparePassword = async function (contrasena) {
    return await bcrypt.compare(contrasena, this.contrasena);
}
module.exports = model('User', userSchema)