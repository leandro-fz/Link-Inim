const routerLogin = require('./auth')
const routerCorsi = require('./courses')

function ConnectRouter(app){
    app.use('/login', routerLogin)
    app.use('/corsi', routerLogin)
}

module.exports = ConnectRouter;