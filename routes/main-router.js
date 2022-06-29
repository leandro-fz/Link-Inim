const routerLogin = require('./auth')
const routerCorsi = require('./courses')
const routerAdmin = require('./adminRoute.js')
const routerHome = require('./adminRoute.js')
const routerPost = require('./postRoute')

function ConnectRouter(app){
    app.use('/login', routerLogin)
    app.use('/home', routerHome)
    app.use('/corsi', routerCorsi)
    app.use('/admin', routerAdmin )
    app.use('/post', routerPost)
}

module.exports = ConnectRouter;