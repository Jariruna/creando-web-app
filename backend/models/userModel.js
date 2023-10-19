const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema; 

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Por favor agrege un nombre"],
        },
        email: {
            type: String,
            required: [true, "Por favor agrege un correo"],
            unique: true,
            trim: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Por favor ingrese un correo valido',
            ],
        },
        password: {
            type: String,
            required: [true, "Por favor agrege una contraseña"],
            minlength: [6, "La contraseña debe tener mas de 6 carateres"],
        },
        role: {
            type: String,
            required: [true],
            default: "customer",
            enum: ["customer", "admin"]
        },
        photo: {
            type: String,
            required:[true, "Por favor agrege una foto"],
            default: "https://i.ibb.co/4pDNDk1/avatar.png",
        },
        phone: {
            type: String,
            default: "+51",
        },
        address: {
            type: Object,
            // direccion provincia departamento
        },

    },
    {
        timestamps: true,
    }
);

// encriptar pasword antes de guarda en la db
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()
    }

    // contraseña hash
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

const User = mongoose.model("User", userSchema);

module.exports = User;