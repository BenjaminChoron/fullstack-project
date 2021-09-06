const {Router} = require('express');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const projectController = require('./controllers/projectController');
const project_technoController = require('./controllers/project_technoController');
const messageController = require('./controllers/messageController');
const avatarController = require('./controllers/avatarController');
const imageController = require('./controllers/imageController');
const technoController = require('./controllers/technoController');

const router = Router();


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



router.get('/messages', messageController.findAll);
router.get('/messages/:id(\\d+)', messageController.findOne);
router.post('/messages/save', messageController.save);
router.delete('/messages/delete/:id(\\d+)', messageController.delete);



router.get('/posts', postController.findAll);
router.get('/posts/:id(\\d+)', postController.findOne);
router.post('/posts/save', postController.save);
router.delete('/posts/delete/:id(\\d+)', postController.delete);



router.get('/projects', projectController.findAll);
router.get('/projects/:id(\\d+)', projectController.findOne);
router.get('/projects/bytitle/:title', projectController.findByTitle);
router.post('/projects/save', projectController.save);
router.delete('/projects/delete/:id(\\d+)', projectController.delete);



router.get('/avatars', avatarController.findAll);
router.get('/avatars/:id(\\d+)', avatarController.findOne);
router.post('/avatars/save', avatarController.save);
router.delete('/avatars/delete/:id(\\d+)', avatarController.delete);



router.get('/images', imageController.findAll);
router.get('/images/:id(\\d+)', imageController.findOne);
router.post('/images/save', imageController.save);
router.delete('/images/delete/:id(\\d+)', imageController.delete);



router.get('/technos', technoController.findAll);
router.get('/technos/:id(\\d+)', technoController.findOne);
router.post('/technos/save', technoController.save);
router.delete('/technos/delete/:id(\\d+)', technoController.delete);



router.get('/projects/:id/technos', project_technoController.findByProject);
router.get('/technos/:id/projects', project_technoController.findByTechno);
router.post('/projects/technos/save', project_technoController.save);
router.delete('/projects/:project_id/technos/:techno_id/delete', project_technoController.delete);

module.exports = router;