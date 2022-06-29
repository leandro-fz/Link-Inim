const { Router } = require('express');
const routerAuth = Router();
const { compare } = require('bcrypt');
const Utente = require('../model/models/utente');
const { deleteToken, getTokenByUtente, generatorToken, validateToken } = require('../model/dao/tokenDao');

routerAuth.post('/', async (req, res) => {
  try {
    const { email, password } = req.body
    const utente = await Utente.getUtenteByEmail(email);
    if (await compare(password, utente.getPassword())) {
      let token = await getTokenByUtente(utente.Id)
      if (token === null || token === undefined){
        let token = await generatorToken(utente.Id)
        return res.json({
          token: token
        }).send()
      }else{
        const validity = await validateToken(token.token)
        if(validity){
          return res.json({
           token:  token.token
          }).send()
        }else{
          const _ = await deleteToken(token.token)
          try {
            token = await generatorToken(utente.Id)
          } catch (error) {
            console.log(error);
          }
          return res.json({
            token: token
          }).send()
        }
      }}
    }catch (error) {
        return res.status(401).json({
          messaggio: 'login failed'
      })
    }
  }
);

module.exports = routerAuth;