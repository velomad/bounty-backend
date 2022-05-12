const {
  addProduct,
  updateProduct,
  updateProductImage,
  deleteProduct,
  deleteProductImage,
  singleProduct,
  getAllProducts
} = require("./product.controller");

const router = require("express").Router();

// GET
router.get("/singleProduct/:productId", singleProduct);
router.get("/allProducts", getAllProducts);

// POST
router.post("/addProduct", addProduct);

// PATCH
router.patch("/updateProduct/:productId", updateProduct);
router.patch("/updateProductImage/:productId", updateProductImage);

// DELETE
router.delete("/deleteProduct/:productId", deleteProduct);
router.delete("/deleteProductImage/:productId", deleteProductImage);

module.exports = router;
