const { Router } = require('express');
const UtenteController  = require('../controller/utenteController');
const routerProfile = Router();

routerProfile.get('/', UtenteController.myProfile) //restituisce informazioni del profilo loggato
routerProfile.put('/newmatching', UtenteController.cambiaMatching) //da finire
routerProfile.put('/newpassword', UtenteController.cambiaPassword) //da finire
routerProfile.get('/logout', UtenteController.logout) //logout

module.exports = routerProfile;