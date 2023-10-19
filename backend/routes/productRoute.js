const express = require("express");
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct, reviewProduct, deleteReview, updateReview } = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddeware");
const router = express.Router();

router.post("/", protect, adminOnly, createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.patch("/:id", protect, adminOnly, updateProduct);
router.patch("/review/:id", protect, reviewProduct);
router.patch("/updateReview/:id", protect, updateReview);


module.exports = router;