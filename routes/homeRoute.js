const { Router } = require('express');
const MatchingController = require('../controller/matchingController');
const { PostController } = require('../controller/postController');
const routerHome = Router();

routerHome.get('/', PostController.lista ) //mostra tutti i post
routerHome.get('/post/:id', PostController.get ) //mostra post specifico
routerHome.post('/post', PostController.insert ) //crea nuovo post
routerHome.put('/post/:id', PostController.update ) //modifica post specifico
routerHome.delete('/post/:id', PostController.delete ) //elimina post specifico

routerHome.get('/matching/specializzazioni', MatchingController.getNomiSpecializzazioni )//nomi di tutte specializzazioni
routerHome.get('/matching/:Idspecializzazione', MatchingController.listaUtentiDisponibili)


module.exports = routerHome;