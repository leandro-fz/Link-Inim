const {Router} = require('express')
const routerAdmin = Router()
const adminController = require('../controller/adminController')

//routerAdmin.get('/', adminController.lista)
routerAdmin.get('/utenti', adminController.lista)
routerAdmin.post('/utente/', adminController.creaUtente)
routerAdmin.delete('/utente/:Id', adminController.checkId , adminController.elimina)
routerAdmin.get('/utente/:Id', adminController.checkId, adminController.get);
routerAdmin.put('/utente/:Id', adminController.checkId, adminController.edit);

routerAdmin.get('/utente/setprof/:Id', adminController.checkId, adminController.profPermission);

module.exports = routerAdmin;