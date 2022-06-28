const routerLogin = require('./auth')
const routerCorsi = require('./courses')

function ConnectRouter(app){
    app.use('/login', routerLogin)
    app.use('/corsi', routerCorsi)
}

module.exports = ConnectRouter;