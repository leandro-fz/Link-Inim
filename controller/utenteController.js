const { forcedExpirationToken } = require("../model/dao/tokenDao");
const { hash } = require('bcrypt');
const Utente = require("../model/models/utente");

class UtenteController {
    //visualizza profilo personale
    static async myProfile(req, res) {
        try {
            let result;
            if (!req.Utente) {
                result = await Utente.get(req.idUtenteLogged);
                console.log(result);
            } else {
                result = req.Utente;
            }
            return res.json(result);
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }

    }

    //cambia la password
    static async cambiaPassword(req, res) {
        try {
            let np;
            if (!req.Utente) {
                np = await Utente.get(req.idUtenteLogged);
            } else {
                np = req.Utente;
            }
            if (req.body.Password) {
                let newPassword = await hash(req.body.Password, 10);
                np.setPassword(newPassword);
            }
            await np.save();
            res.status(200).send("Password cambiata correttamente");
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");

        }
    }

    //effettua il logout
    static async logout(req, res) {
        try {
            let np;
            if (!req.Utente) {
                np = await Utente.get(req.idUtenteLogged);
            } else {
                np = req.Utente;
            }
            let res2 = await forcedExpirationToken(req.idUtenteLogged, req.actualToken, 0, 0)
            if (!res2) {
                res.status(500).send("Internal Server Error Token");
            }
            res.status(200).send("LOGOUT EFFETTUATO");
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");

        }
    }


    //cambia lo stato di disponibilità
    static async cambiaMatching(req, res) {
        try {
            let np;
            if (!req.Utente) {
                np = await Utente.get(req.idUtenteLogged);
            } else {
                np = req.Utente;
            }
            np.Matching <= 0 ? np.setMatching(1) : np.setMatching(0)
            await np.save();
            res.status(200).send("Ok");
        } catch (error) {
            res.status(500).send("Internal Server Error");

        }
    }


}


module.exports = UtenteController
