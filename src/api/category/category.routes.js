const {
  addCategory,
  removeCategory,
  addSubCategory,
  removeSubCategory,
  getAllCategories
} = require("./category.controller");

const router = require("express").Router();

// GET
router.get("/allcategories", getAllCategories);

// POST
router.post("/addcategory", addCategory);
router.post("/addsubcategory", addSubCategory);

// DELETE
router.delete("/removecategory/:categoryId", removeCategory);
router.delete("/removesubcategory/:subCategoryId", removeSubCategory);

module.exports = router;
