const {Router} = require('express')
const routerAdmin = Router()
const adminController = require('../controller/adminController')

//routerAdmin.get('/', adminController.lista)
routerAdmin.get('/utenti', adminController.lista)
routerAdmin.post('/utente/crea', adminController.creaUtente)
routerAdmin.delete('/utente/:id', adminController.checkId , adminController.elimina)
//routerAdmin.delete('/utente/:id', sedeController.checkId , sedeController.elimina ) elimina  gli utentu
//routerAdmin.get('/utente/:id', sedeController.checkId, sedeController.get);
//routerAdmin.put('/:id', sedeController.checkId, sedeController.edit);

module.exports = routerAdmin;