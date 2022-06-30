const { checkIsAdmin } = require('../model/dao/utenteDao');

//controlla permessi da amministratore
async function checkAdminAuth(req, res, next) {
    const IsAdmin = await checkIsAdmin(req.idUtenteLogged);
    if (IsAdmin.IsAdmin <= 0) {
      return res.status(403).json({
        messaggio: 'utente non ha i provilegi di admin'
      })
    }
    next();
  }
  
module.exports = checkAdminAuth;