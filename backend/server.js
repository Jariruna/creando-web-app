const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const errorHandler = require("./middleware/errorMiddleware")

const app = express();

//MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ["http://localhost:5173", "https://nsfiltros.vercel.app"],
        credentials: true,
    })
    
);

//rutas
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
    res.send("Home Page...");
});

//Error middleware
app.use(errorHandler);
const PORT = process.env.PORT || 5000

//conectart con la bd
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`)
        })
    })
    .catch((err) => console.log(err))

