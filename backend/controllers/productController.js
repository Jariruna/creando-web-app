const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { default: mongoose } = require("mongoose");

const createProduct = asyncHandler (async (req, res) => {
    const {
        name,
        sku,
        category,
        brand,
        quantity,
        description,
        image,
        regularPrice,
        price,
    } = req.body

    if(!name || !category || !brand || !quantity || !price || !description){
        res.status(400);
        throw new Error("Por favor rellene todos los campos");
    }

    // Crear Producto
    const product = await Product.create({
        name,
        sku,
        category,
        brand,
        quantity,
        description,
        image,
        regularPrice,
        price,
    })

    res.status(201).json(product)

});

// traer todos los productos
const getProducts = asyncHandler (async (req, res) => {
    const products = await Product.find().sort("-createAt")
    res.status(200).json(products)
});

// traer un solo producto
const getProduct = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(400);
        throw new Error("Producto no encontrado");
    }
    res.status(200).json(product)
});

//borrar producto
const deleteProduct = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(400);
        throw new Error("Producto no encontrado");
    }
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "Producto eliminado"})
});

// actualizar producto
const updateProduct = asyncHandler (async (req, res) => {
    const {
        name,
        category,
        brand,
        quantity,
        description,
        image,
        regularPrice,
        price,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(400);
        throw new Error("Producto no encontrado");
    }
    // actualizar producto
    const updateProduct = await Product.findByIdAndUpdate(
        {_id: req.params.id},
        {
            name,
            category,
            brand,
            quantity,
            description,
            image,
            regularPrice,
            price,
        },
        {
            new: true,
            runValidators: true,
        }
    )
    res.status(200).json(updateProduct)
});

// revisar productos
const reviewProduct = asyncHandler (async (req, res) => {
    const {star, review, reviewDate} = req.body
    const { id } = req.params

    // Validation
    if(star < 1 || !review){
        res.status(400);
        throw new Error("Por favor coloque una estrella a la revision")
    }

    const product = await Product.findById(id);

    if(!product) {
        res.status(400);
        throw new Error("Producto no encontrado")
    }

    //actualizar rating
    product.ratings.push(
        {
            star,
            review,
            reviewDate,
            name: req.user.name,
            userID:req.user._id,
        }
    )
    product.save()
    res.status(200).json({ message: "Revision del producto agregado" });
});

// Borrar review
const deleteReview = asyncHandler (async (req, res) => {
    const { userID } = req.body
    const product = await Product.findById(req.params.id);

    if( !product ){
        res.status(400);
        throw new Error("Producto no encontrado")
    }

    const newRatings = product.ratings.filter((rating) => {
        return rating.userID.toString() !== userID.toString()
    })
    product.ratings = newRatings
    product.save()
    res.status(200).json({ message: "Revision del producto borrado" });
});

// actualizar review
const updateReview = asyncHandler (async (req, res) => {
    const {star, review, reviewDate, userID } = req.body
    const { id } = req.params;

    // Validation
    if(star < 1 || !review){
        res.status(400);
        throw new Error("Por favor coloque una estrella a la revision")
    }

    const product = await Product.findById(id);

    if(!product) {
        res.status(400);
        throw new Error("Producto no encontrado")
    }

    // unir review al usuario
    if(req.user._id.toString() !== userID){
        res.status(401)
        throw new Error("Usuario no autorizado")
    }
    // actualizar review del producto
    const updateReview = await Product.findOneAndUpdate(
        {
            _id: product._id,
            "ratings.userID": new mongoose.Types.ObjectId(userID)
        },
        {
            $set: {
                "ratings.$.star": star,
                "ratings.$.review": review,
                "ratings.$.reviewDate": reviewDate,
            }
        }
    )
    if(updateReview){
        res.status(200).json({ message: "Revision del producto actualizado" });
    } else {
        res.status(400).json({ message: "Revision del producto No actualizado" });
    }

    

});

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    reviewProduct,
    deleteReview,
    updateReview
}