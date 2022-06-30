const { Router } = require('express');
const UtenteController  = require('../controller/utenteController');
const routerProfile = Router();

//restituisce informazioni del profilo loggato
routerProfile.get('/', UtenteController.myProfile)

//cambia stato del matching della persona loggata
routerProfile.put('/newmatching', UtenteController.cambiaMatching)

//cambia la password della persona loggata
routerProfile.put('/newpassword', UtenteController.cambiaPassword)

//effettua il logout
routerProfile.get('/logout', UtenteController.logout)

module.exports = routerProfile;