const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true, //quitar espacios
            unique: true,
            validate: [validator.isEmail, 'Email not valid'],
          },
          name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
          },
          password: {
            type: String,
            required: true,
            trim: true,
            validate: [validator.isStrongPassword], //minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
          },
          gender: {
            type: String,
            enum: ['hombre', 'mujer', 'otros'],
            required: true,
          },
          rol: {
            type: String,
            enum: ['admin', 'user', 'superadmin'],
            default: 'user',
          },
          confirmationCode: {
            type: Number,
            required: true,
          },
          check: {
            type: Boolean,
            default: false,
          },
          image: {
            type: String,
          },
    },
    {
        timestamps: true,
    }
);

//ANTES DE GUARDAR EL MODEL COGE LA CONTRASEÑA Y LE DA 10 VUELTAS PARA ENCRIPTARLA //HASHEAR
userSchema.pre('save', async function (next) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next(); //SIGUE
    } catch (error) {
      next('Error hashing password', error);
    }
  });

  const user = mongoose.model(`user`, userSchema);
  module.exports = user;