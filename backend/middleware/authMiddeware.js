const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async(req, res, next) =>{

    try{
        const token = req.cookies.token
        if(!token){
            res.status(401);
            throw new Error("No autorizado, inicie sesion por favor");
        }

        //verificar token

        const verified = jwt.verify(token,  process.env.JWT_SECRET);

        //traer id de usuario
        const user = await User.findById(verified.id).select("-password");

        if(!user){
            res.status(401);
            throw new Error("Usuario no encontrado");
        }

        req.user = user
        next()


    }catch(error){
        res.status(401);
        throw new Error("No autorizado, inicie sesion por favor");
    }
});

// Solo Administradores
const adminOnly = (req, res, next) => {
    if(req.user && req.user.role == "admin"){
        next()
    } else {
        res.status(401)
        throw new Error("No autorizado, Ud. no es administrador")
    }
};

module.exports = {
    protect,
    adminOnly
}