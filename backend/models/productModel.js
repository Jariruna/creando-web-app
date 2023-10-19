const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Coloque un nombre"],
        trim: true,
    },
    sku: {
        type: String,
        required: true,
        default: "SKU",
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Coloque una Categoria"],
        trim: true,
    },
    brand: {
        type: String,
        required: [true, "Coloque una marca"],
        trim: true,
    },
    // color: {
    //     type: String,
    //     required: [true, "Coloque un color"],
    //     default: "Como se ve",
    //     trim: true,
    // },
    quantity: {
        type: Number,
        required: [true, "Coloque una cantidad"],
        trim: true,
    },
    sold: {
        type: Number,
        default: 0,
        trim: true,
    },
    regularPrice: {
        type: Number,
        // required: [true, "Coloque un Precio"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Coloque un Precio"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Coloque una descripción"],
        trim: true,
    },
    image: {
        type: [String],
    },
    ratings: {
        type: [Object],
    }
},
{
    timestamps: true,
}
)

const Product = mongoose.model("Product", productSchema);

module.exports = Product;