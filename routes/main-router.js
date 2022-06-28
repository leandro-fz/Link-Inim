const routerLogin = require('./auth')
const routerCorsi = require('./courses')
const routerAdmin = require('./adminRoute.js')

function ConnectRouter(app){
    app.use('/login', routerLogin)
    app.use('/corsi', routerCorsi)
    app.use('/admin', routerAdmin )
}

module.exports = ConnectRouter;