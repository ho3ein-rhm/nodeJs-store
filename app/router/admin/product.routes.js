const {
  productController,
} = require("../../http/controllers/admin/products.controller");

const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *      name : Products-Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *        products:
 *            type: object
 *            required:
 *                -   title
 *                -   short-text
 *                -   text
 *                -   images
 *                -   tags
 *                -   category
 *                -   price
 *            properties:
 *                title:
 *                    type: string
 *                    description: tile of product
 *                short-text:
 *                    type: string
 *                    description: short text of product
 *                images:
 *                    type: file
 *                    description: images of the category
 *                tags:
 *                    type: array
 *                    description: tags of the category
 *                category:
 *                    type: string
 *                    description: category of the category
 *                price:
 *                    type: string
 *                    description: price of the category
 *                discount:
 *                    type: string
 *                    description: discount of the category
 *                count:
 *                    type: string
 *                    description: count of the category
 */

/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [Products-Routes]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/products'
 */
router.post("/add", productController.addproduct);

module.exports = {
  productRoutes: router,
};
