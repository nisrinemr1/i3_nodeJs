const express = require("express")
const router = express.Router()

const categoriesController = require("../controllers/categories.controller")


// localhost:3000/api/categories/          --> get all
router.get("/", categoriesController.getAllCategories)


// localhost:3000/api/categories/:idProd   --> get one by id
router.get("/:id", categoriesController.getOneCategorie)


// localhost:3000/api/categories/          --> post categories
router.post("/", categoriesController.postCategorie)


// localhost:3000/api/categories/:idProd   --> put / patch categories on product
router.put("/:id", categoriesController.putCategorie)


// localhost:3000/api/categories/:idProd   --> delete one categories on product
router.delete("/:id", categoriesController.deleteCategorie)


module.exports = router