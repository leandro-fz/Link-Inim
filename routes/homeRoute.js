const { Router } = require('express');
const MatchingController = require('../controller/matchingController');
const { PostController } = require('../controller/postController');
const routerHome = Router();

//mostra tutti i post
routerHome.get('/', PostController.lista ) 

//CRUD per la gestione del singolo post
routerHome.get('/post/:id', PostController.get ) 
routerHome.post('/post', PostController.insert ) 
routerHome.put('/post/:id', PostController.update ) 
routerHome.delete('/post/:id', PostController.delete )

//nomi di tutte le specializzazioni a cui è possibile matchare
routerHome.get('/matching/specializzazioni', MatchingController.getNomiSpecializzazioni )
//restituisce i nomi dele persone disponibili al matching con la specializzazione scelta
routerHome.get('/matching/:Idspecializzazione', MatchingController.listaUtentiDisponibili)


module.exports = routerHome;