const { Router } = require('express');
const { PostController } = require('../controller/postController');
const routerPost = Router();
const { compare } = require('bcrypt');


routerPost.get('/', PostController.lista);
routerPost.get('/:id', PostController.get);
routerPost.put('/:id', PostController.update);
routerPost.post('/', PostController.insert);
routerPost.delete('/:id', PostController.delete)



module.exports = routerPost;