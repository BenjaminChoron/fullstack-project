const {Router} = require('express');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const projectController = require('./controllers/projectController');
const messageController = require('./controllers/messageController');
const avatarController = require('./controllers/avatarController');
const imageController = require('./controllers/imageController');

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




router.get('/messages', messageController.findAll);
router.get('/messages/:id(\\d+)', messageController.findOne);
router.post('/messages/save', messageController.save);
router.delete('/messages/delete/:id(\\d+)', messageController.delete);




router.get('/avatars', avatarController.findAll);
router.get('/avatars/:id(\\d+)', avatarController.findOne);
router.post('/avatars/save', avatarController.save);
router.delete('/avatars/delete/:id(\\d+)', avatarController.delete);




router.get('/images', imageController.findAll);
router.get('/images/:id(\\d+)', imageController.findOne);
router.post('/images/save', imageController.save);
router.delete('/images/delete/:id(\\d+)', imageController.delete);

module.exports = router;