const product = require("express").Router();
const productController = require("../controllers/products");


product.get("/:id", productController.getDetailProductById);
product.put("/update/:id", productController.UpdateProducts);
product.put("/:id", productController.deleteProducts);
product.post("/", productController.createProducts);
product.get("/", productController.SearchProducts);

module.exports = product;
