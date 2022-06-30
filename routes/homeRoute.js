const { Router } = require('express');
const { PostController } = require('../controller/postController');
const routerHome = Router();

routerHome.get('/', PostController.lista ) //mostra tutti i post
routerHome.get('/post/:id', PostController.get ) //mostra tutti i post
routerHome.post('/post', PostController.insert ) //mostra tutti i post
routerHome.put('/post/:id', PostController.update ) //mostra tutti i post
routerHome.delete('/post/:id', PostController.delete ) //mostra tutti i post

module.exports = routerHome;