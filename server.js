require("dotenv").config();
require("./src/config/cloudinary");

const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const morgan = require("morgan");

const { notFound, errorHandling } = require("./src/errorHandler");
const { fileStorage, fileFilter } = require("./src/multer");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("common"));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("imageUrl")
);

// eleminates the null fields from the response object
// app.set("json replacer", (k, v) => (v === null ? undefined : v));

app.get("/", (req, res) => {
  res.send(
    "<div style='color:blue; font-size:20px; font-style:bold'>Candidleads-DCS-Server</div>"
  );
});

// routes
app.use("/api/v1/auth", require("./src/api/auth/auth.routes"));
app.use("/api/v1/user", require("./src/api/user/user.routes"));
app.use("/api/v1/category", require("./src/api/category/category.routes"));
app.use("/api/v1/product", require("./src/api/product/product.routes"));
app.use("/api/v1/order", require("./src/api/order/order.routes"));

// error handling
app.use(notFound);

app.use(errorHandling);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listning at port : ${port}`);
});
