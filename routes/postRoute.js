const { Router } = require('express');
const { PostController } = require('../controller/postController');
const routerPost = Router();
const { compare } = require('bcrypt');
const { CommentiPostController } = require('../controller/commentsPostController');


routerPost.get('/', PostController.lista);
routerPost.get('/:id', PostController.get);
routerPost.put('/:id', PostController.update);
routerPost.post('/', PostController.insert);
routerPost.delete('/:id', PostController.delete)

routerPost.get('/:id/commenti', CommentiPostController.lista);
routerPost.get('/:id/commenti/:idCommentiPost', PostController.checkId, CommentiPostController.checkIdCommento, CommentiPostController.get);
routerPost.put('/:id/commenti/:idCommentiPost', PostController.checkId, CommentiPostController.checkIdCommento, CommentiPostController.update);
routerPost.post('/:id/commenti', PostController.checkId, CommentiPostController.insert);
routerPost.delete('/:id/commenti/:idCommentiPost', PostController.checkId, CommentiPostController.checkIdCommento, CommentiPostController.delete);

module.exports = routerPost;