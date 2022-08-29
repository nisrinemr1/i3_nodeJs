const express = require("express")
const router = express.Router()


const productsController = require("../controllers/products.controller")


// localhost:3000/api/products/            --> get all
router.get("/", productsController.getAllProducts)


// localhost:3000/api/products/:id         --> get one by id
router.get("/:id", productsController.getOneProduct)


// localhost:3000/api/products/            --> post product
router.post("/", productsController.postProduct)


// localhost:3000/api/products/:id         --> put / patch product
router.put("/:id", productsController.putProduct)

// localhost:3000/api/products/:id         --> delete one product
router.delete("/:id", productsController.deleteProduct)


module.exports = router