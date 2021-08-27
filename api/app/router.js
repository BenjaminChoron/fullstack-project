const {Router} = require('express');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const projectController = require('./controllers/projectController');

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

router.delete('/users/delete/:id(\\d+)', userController.delete);




router.get('/posts', postController.findAll);

router.get('/posts/:id(\\d+)', postController.findOne);

router.post('/posts/save', postController.save);

router.delete('/posts/delete/:id(\\d+)', postController.delete);




router.get('/projects', projectController.findAll);

router.get('/projects/:id(\\d+)', projectController.findOne);

router.post('/projects/save', projectController.save);

router.delete('/projects/delete/:id(\\d+)', projectController.delete);

module.exports = router;