const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel")

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
};

//registrar usuario
const registerUser = asyncHandler (async (req, res)=> {
    const { name, email, password} =req.body;

    // validacion
    if(!name || !email || !password) {
        res.status(400);
        throw newError("Por favor llene todos los campos");
    }
    if(password.length < 6) {
        res.status(400);
        throw newError("La contraseña debe tener mas de 6 carateres");
    }

    // verificar sin el ususario existe
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400);
        throw new Error("Email has already been registered")
    }

    // crear nuevo usuario
    const user = await User.create({
        name,
        email,
        password
    })

    // generar token
    const token = generateToken(user._id);

    if(user){
        const { _id, name, email, role } = user
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            // secure: true,
            // sameSite: none,
        })
        // enviando datos de usuario
        res.status(201).json({
            _id, name, email, role, token,
        });
    }else{
        res.status(400);
        throw new Error("Usuario Invalido")
    }

    res.send("Register User...");
});

// inicio de sesion usuario
const loginUser = asyncHandler (async (req, res) => {
    const { email, password } =req.body;

    //validate Request
    if(!email || !password) {
        res.status(400);
        throw new Error("Por favor coloque un correo y contraseña");
    };

    //verificar si el usuario existe
    const user = await User.findOne({ email });
    if(!user){
        res.status(400);
        throw new Error("El usuario no existe");
    }

    // usuario existe, checkear si el password es correcto
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    //generar Token

    const token = generateToken(user._id);
        if(user && passwordIsCorrect){
            const newUser = await User.findOne({ email }).select("-password");
            res.cookie("token", token, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400),
                // secure: true,
                // sameSite: none,
            });
            // enviando datos de usuario
            res.status(201).json(newUser);
        } else {
            res.status(400);
            throw new Error("correo o contraseña invalidos");
        }

    
});

// cerrar sesion usuario
const logout = asyncHandler(async (req,res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        // secure: true,
        // sameSite: none,
    });
    return res.status(200).json({message: "Cerro sesion exitosamente"})
});

// traer un usuario
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password")
    if(user){
        res.status(200).json(user);
    } else {
        res.status(400);
        throw new Error("Usuario no encontrado")
    }
});

//traer stado del Inicio de sesion
const getLoginStatus = asyncHandler (async(req, res) => {
    const token = req.cookies.token;
    if(!token){
        return res.json(false);
    }
    //verificar token
    const verified = jwt.verify(token,  process.env.JWT_SECRET);
    if(verified){
        res.json(true);
    } else {

        res.json(false);
    }
});

// actualizar usuario
const updateUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        const {name, phone , address} = user;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.address = req.body.address || address;

        const updateUser = await user.save();
        res.status(200).json(updateUser);
    } else {
        res.status(404);
        throw new Error("Usuario no encontrado")
    }
});

//actualizar foto
const updatePhoto = asyncHandler (async (req, res) => {
 const { photo } =req.body;
 const user = await User.findById(req.user._id);
 user.photo = photo
 const updateUser = await user.save();
 res.status(200).json(updateUser);
});

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser, 
    getLoginStatus,
    updateUser,
    updatePhoto,
}