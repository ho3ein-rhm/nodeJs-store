const {
  categoryController,
} = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      name : Category-Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *        category:
 *            type: object
 *            required:
 *                -   title
 *            properties:
 *                title:
 *                    type: string
 *                    description: name of the category
 *                parent:
 *                    type: string
 *                    description: parent of the category
 */

/**
 * @swagger
 * /admin/category/add:
 *  post:
 *      summery: craete category
 *      tags: [Category-Routes]
 *      description: creating the category
 *      parameters:
 *          -  in: header
 *             value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM2MzE2MjAzNyIsImlhdCI6MTcwMDY3NDY4NCwiZXhwIjoxNzAwNjc4Mjg0fQ.lq9LlHecdMs1dAyoRr1ZdaWOhPwpmC6NjgC9L_p5Xe4
 *             name: accesstoken
 *             type: string
 *             required: true
 *      requestBody:
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *                schema:
 *                    $ref: '#/components/schemas/category'
 *            application/json:
 *                schema:
 *                    $ref: '#/components/schemas/category'
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
router.post("/add", categoryController.addcategory);
router.get("/parent", categoryController.readparentCategory);
router.get("/children/:parent", categoryController.getChildrenCategory);
router.delete("/delete-category/:id", categoryController.deleteCategory);
/**
 * @swagger
 * /admin/category/all:
 *  get:
 *      summary: category route
 *      tags: [Category-Routes]
 *      description: get all data for  category
 *      parameters:
 *          -   in: header
 *              name: accessToken
 *              value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM2MzE2MjAzNyIsImlhdCI6MTcwMDY3NDY4NCwiZXhwIjoxNzAwNjc4Mjg0fQ.lq9LlHecdMs1dAyoRr1ZdaWOhPwpmC6NjgC9L_p5Xe4
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description : not found
 *
 */
router.get("/all", categoryController.getAllCategorys);
router.get("/all/chidrens/:id", categoryController.getCategoryById);
/**
 * @swagger
 * /admin/category/delete-all-categorys/{id}:
 *  delete:
 *      summery: remove category
 *      tags: [Category-Routes]
 *      description: creating the category
 *      parameters:
 *          -  in: header
 *             value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM2MzE2MjAzNyIsImlhdCI6MTcwMDY3NDY4NCwiZXhwIjoxNzAwNjc4Mjg0fQ.lq9LlHecdMs1dAyoRr1ZdaWOhPwpmC6NjgC9L_p5Xe4
 *             name: accesstoken
 *             type: string
 *             required: true
 *          - in: path
 *            name: id
 *            type: string
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
router.delete(
  "/delete-all-categorys/:id",
  categoryController.deleteallCategort
);

module.exports = {
  categoryRoutes: router,
};
