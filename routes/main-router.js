
const routerLogin = require('./auth')

function ConnectRouter(app){
    app.use('/login', routerLogin)
}

module.exports = ConnectRouter;