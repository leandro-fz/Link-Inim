const routerLogin = require('./auth')
const routerCorsi = require('./coursesRouter')
const routerAdmin = require('./adminRoute.js')
const routerHome = require('./adminRoute.js')

function ConnectRouter(app){
    app.use('/login', routerLogin)
    app.use('/home', routerHome)
    app.use('/corsi', routerCorsi)
    app.use('/admin', routerAdmin )
}

module.exports = ConnectRouter;