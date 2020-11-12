const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    nombre: String,
    correo: String,
    contrasena: String,
    provider: String,
    provider_id: String,
    foto: {
        type: String,
        default: null
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
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