const {Router} = require('express');
const userController = require('./controllers/userController');

const router = Router();


router.get('/hello', (_, response) => response.json('Hello World !'));

/**
 * Respond with all users in database
 * @route GET /v1/users
 * @group Users
 * @returns {Array<User>} 200 - An array of users
 * @returns {string} 500 - An error message
 */
router.get('/users', userController.findAll);

router.get('/users/:id(\\d+)', userController.findOne);

/**
* @typedef UserPost
* @property {number} id
* @property {string} first_name
* @property {string} last_name
* @property {string} email
* @property {string} password
* @property {number} avatar_id
*/
router.post('/users/save', userController.save);

module.exports = router;