const {
  productController,
} = require("../../http/controllers/admin/products.controller");
const { fileUpload } = require("../../utils/multer");

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
 *                -   short_text
 *                -   text
 *                -   images
 *                -   tags
 *                -   category
 *                -   price
 *            properties:
 *                title:
 *                    type: string
 *                    description: tile of product
 *                short_text:
 *                    type: string
 *                    description: short text of product
 *                text:
 *                    type: string
 *                    description: short text of product
 *                images:
 *                    type: array
 *                    items:
 *                        type: string
 *                        format: binary
 *                    description: images of the product
 *                tags:
 *                    type: array
 *                    description: tags of the product
 *                category:
 *                    type: string
 *                    description: category of the product
 *                price:
 *                    type: number
 *                    description: price of the product
 *                discount:
 *                    type: number
 *                    description: discount of the product
 *                count:
 *                    type: number
 *                    description: count of the product
 *                length:
 *                    type: number
 *                    description: length of the product
 *                height:
 *                    type: number
 *                    description: height of the product
 *                width:
 *                    type: number
 *                    description: width of the product
 *                weight:
 *                    type: number
 *                    description: weight of the product
 */


/**
 * @swagger
 *  components:
 *    schemas:
 *        edit-product:
 *            type: object
 *            properties:
 *                title:
 *                    type: string
 *                    description: tile of product
 *                short_text:
 *                    type: string
 *                    description: short text of product
 *                text:
 *                    type: string
 *                    description: short text of product
 *                images:
 *                    type: array
 *                    items:
 *                        type: string
 *                        format: binary
 *                    description: images of the product
 *                tags:
 *                    type: array
 *                    description: tags of the product
 *                category:
 *                    type: string
 *                    description: category of the product
 *                price:
 *                    type: number
 *                    description: price of the product
 *                discount:
 *                    type: number
 *                    description: discount of the product
 *                count:
 *                    type: number
 *                    description: count of the product
 *                length:
 *                    type: number
 *                    description: length of the product
 *                height:
 *                    type: number
 *                    description: height of the product
 *                width:
 *                    type: number
 *                    description: width of the product
 *                weight:
 *                    type: number
 *                    description: weight of the product
 */


/**
 * @swagger
 * /admin/products/add:
 *  post:
 *      summery: craete products
 *      tags: [Products-Routes]
 *      description: creating the products
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *                schema:
 *                    $ref: '#/components/schemas/products'
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthrorization
 *          500:
 *              description: Internal Server Error
 */
router.post(
  "/add",
  fileUpload.array("images", 10),
  productController.addproduct
);
/**
 * @swagger
 * /admin/products/show-all:
 *  get:
 *      summery: show all of your product
 *      tags: [Products-Routes]
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthrorization
 *          500:
 *              description: Internal Server Error
 */
router.get("/show-all", productController.showProduct);

/**
 * @swagger
 * /admin/products/show/{id}:
 *  get:
 *      summery: show all of your product
 *      tags: [Products-Routes]
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              description: get object id and show product
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthrorization
 *          500:
 *              description: Internal Server Error
 */
router.get("/show/:id", productController.getOneProductById);
/**
 * @swagger
 * /admin/products/remove/{id}:
 *  delete:
 *      summery: show all of your product
 *      tags: [Products-Routes]
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              description: get object id and show product
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthrorization
 *          500:
 *              description: Internal Server Error
 */
router.delete("/remove/:id", productController.removeOneProductById);

/**
 * @swagger
 * /admin/products/list:
 *  get:
 *      summery: show all of your product
 *      tags: [Products-Routes]
 *      parameters:
 *          -   in: query
 *              name: search
 *              type: string
 *              description: search in text and title and short text
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthrorization
 *          500:
 *              description: Internal Server Error
 */
router.get("/list", productController.getProductBySearch);

/**
 * @swagger
 * /admin/products/update-product/{id}:
 *  patch:
 *      summery: update products
 *      tags: [Products-Routes]
 *      description: patching the products
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              description: get object id and update product
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *                schema:
 *                    $ref: '#/components/schemas/edit-product'
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthrorization
 *          500:
 *              description: Internal Server Error
 */

router.patch(
  "/update-product/:id",
  fileUpload.array("images", 10),
  productController.updateProduct
);

module.exports = {
  productRoutes: router,
};
