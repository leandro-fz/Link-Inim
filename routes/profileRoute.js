const { Router } = require('express');
const { UtenteController } = require('../controller/utenteController');
const routerProfile = Router();

routerProfile.get('/', UtenteController.myProfile) //inserire middleware loggato
routerProfile.put('/', UtenteController.myProfile) //inserire middleware loggato

module.exports = routerProfile;