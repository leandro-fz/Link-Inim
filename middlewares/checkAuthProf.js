    //accedi al dao di utente, prendi il dato se is prof ù disponibile
    //e lo salvi in una nuova variabile
    //let isproftrue = await metodo  dao di utente
    //if <0 
const { checkIsProf } = require('../model/dao/utenteDao');

async function checkProfAuth(req, res, next) {
    const IsProf = await checkIsProf(req.idUtenteLogged);
    if (IsProf.IsProf <= 0) {
      return res.status(401).json({
        messaggio: 'utente non autorizzato'
      })
    }
    next();
  }
  
module.exports = checkProfAuth;