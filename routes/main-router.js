const routerLogin = require('./auth')
const routerCorsi = require('./coursesRouter')
const routerAdmin = require('./adminRoute.js')

const routerHome = require('./homeRoute.js')
const routerProfile = require('./profileRoute.js')
const controllaAutenticazione = require('../middlewares/checkAuth')

function ConnectRouter(app){
    app.use('/login', routerLogin)
    app.use('/home', routerHome)
    app.use('/corsi', routerCorsi)
    app.use('/admin', routerAdmin )
    app.use('/profile',controllaAutenticazione, routerProfile )
}

module.exports = ConnectRouter;