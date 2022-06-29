const {Router} = require('express')
const routerAdmin = Router()
const adminController = require('../controller/adminController')

//routerAdmin.get('/', adminController.lista)
routerAdmin.get('/utenti', adminController.lista)
routerAdmin.post('/utente/', adminController.creaUtente)
routerAdmin.delete('/utente/:id', adminController.checkId , adminController.elimina)
routerAdmin.get('/utente/:id', adminController.checkId, adminController.get);
routerAdmin.put('/utente/:id', adminController.checkId, adminController.edit);

routerAdmin.get('/utente/setProf/:id', adminController.checkId, adminController.profPermission);

module.exports = routerAdmin;