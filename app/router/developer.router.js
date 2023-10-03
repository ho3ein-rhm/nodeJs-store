const router = require("express").Router();
const bcrypt = require("bcrypt");
/**
 * @swagger
 *  tags:
 *      name : Developer-Routes
 *      description : is empty!
 */

/**
 * @swagger
 * /developer/hash-Password/{password}:
 *  get:
 *      summary: developer route
 *      description: get password and hash it
 *      parameters:
 *          -   in: path
 *              name: password
 *              example: enter...
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description : not found
 *
 */
router.get("/hash-Password/:password", (req, res, next) => {
  const { password } = req.params;
  console.log(password);
  const salt = bcrypt.genSaltSync(10);
  const hachPassword = bcrypt.hashSync(password, salt);
  return res.json({
    data: {
      hachPassword,
    },
  });
});
router.get("/random-generate-number/:lenght", (req, res, next) => {
  const { lenght } = req.params;
  console.log(lenght);
  function getRandumNumber(length) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length);
    return Math.floor(Math.random() * (max - min) + min);
  }
  return res.send(getRandumNumber(+lenght));
});

module.exports = {
  DeveloperRoutes: router,
};
