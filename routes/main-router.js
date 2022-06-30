const routerLogin = require('./auth')
const routerCorsi = require('./coursesRouter')
const routerAdmin = require('./adminRoute.js')
const routerHome = require('./homeRoute.js')
const routerProfile = require('./profileRoute.js')
const controllaAutenticazione = require('../middlewares/checkAuth')
const controllaAutenticazioneAdmin = require('../middlewares/checkAuthAdmin')

function ConnectRouter(app) {
    app.use('/login', routerLogin)
    app.use('/home', controllaAutenticazione, routerHome)
    app.use('/corso', controllaAutenticazione, routerCorsi)
    app.use('/admin', controllaAutenticazione, controllaAutenticazioneAdmin, routerAdmin)
    app.use('/profile', controllaAutenticazione, routerProfile)
}

module.exports = ConnectRouter;