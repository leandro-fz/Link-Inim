const { checkIsProf } = require('../model/dao/utenteDao');

//controlla permessi da professore
async function checkProfAuth(req, res, next) {
    const IsProf = await checkIsProf(req.idUtenteLogged);
    if (IsProf.IsProf <= 0) {
      return res.status(403).json({
        messaggio: 'utente non ha i privilegi di professore'
      })
    }
    next();
  }
  
module.exports = checkProfAuth;