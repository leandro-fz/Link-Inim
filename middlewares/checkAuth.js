const { validateToken } = require('../model/dao/tokenDao');

async function controllaAutenticazione(req, res, next) {
    const header = req.headers['authorization'];
    if (!header) {
      return res.status(401).json({
        messaggio: 'metti un header per favore'
      })
    }
    const [bearer, token] = header.split(' ');
    if (bearer !== 'Bearer' || !token || token.length === 0) {
      return res.status(401).json({
        messaggio: 'metti header di tipo Bearer o Token di lunghezza valida'
      })
    }
    const idUtenteLogged = await validateToken(token)
    if (!idUtenteLogged) {
      return res.status(403).json({
        messaggio: 'token non valido'
      })
    }
    //accedi al dao di utente, prendi il dto se is prof ù disponibile
    //e lo salvi in unanuova variabile
    //let isproftrue = await meto  dao di utente
    //if <0 
    req.idUtenteLogged = idUtenteLogged;
    req.actualToken = token;
    next();
  }
  
module.exports = controllaAutenticazione;