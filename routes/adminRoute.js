const { Router } = require('express')
const routerAdmin = Router()
const adminController = require('../controller/adminController')

//schermata base admin
routerAdmin.get('/', function (req, res) {
    res.json({
        messaggio: 'Accesso effettuato comr Admin'
    }).send()
})

//restituisce lista di tutti gli utenti
routerAdmin.get('/utenti', adminController.lista)

//CRUD per gestire singoli utenti
routerAdmin.post('/utente/', adminController.creaUtente)
routerAdmin.delete('/utente/:Id', adminController.checkId, adminController.elimina)
routerAdmin.get('/utente/:Id', adminController.checkId, adminController.get);
routerAdmin.put('/utente/:Id', adminController.checkId, adminController.edit);

//concede privilegi di professore a un utente specifico
routerAdmin.get('/utente/setprof/:Id', adminController.checkId, adminController.profPermission);


module.exports = routerAdmin;