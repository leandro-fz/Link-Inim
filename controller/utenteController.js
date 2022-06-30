const { listCourses } = require("../model/dao/coursesDao");
const { forcedExpirationToken, getTokenByUtente } = require("../model/dao/tokenDao");
const Utente = require("../model/models/utente");

class UtenteController {
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

    static async cambiaPassword(req, res) {
        try {
            let np;
            if ( !req.Utente ) {
                np = await Utente.get(req.idUtenteLogged);
            } else {
                np = req.Utente;
            }
            if (req.body.Password){
                let newPassword = await hash(req.body.Password, 10);
                ns.setPassword(newPassword);
            }
            await np.save();
            res.status(200).send("Ok");
        } catch (error) {
            res.status(500).send("Internal Server Error");

        }
    }


    static async logout(req, res) {
        try {
            let np;
            if ( !req.Utente ) {
                np = await Utente.get(req.idUtenteLogged);
            } else {
                np = req.Utente;
            }
            let res2 = await forcedExpirationToken(req.idUtenteLogged, req.actualToken, 0, 0 )
            if (!res2) {
                res.status(500).send("Internal Server Error Token");
            }
            res.status(200).send("LOGOUT EFFETTUATO");
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");

        }
    }

    static async cambiaMatching(req, res) {
        try {
            let np;
            if ( ! req.Utente ) {
                np = await Utente.get(req.idUtenteLogged);
            } else {
                np = req.Utente;
            }
            np.setMatching(req.body.Matching)
            await np.save();
            res.status(200).send("Ok");
        } catch (error) {
            res.status(500).send("Internal Server Error");

        }
    }


}


module.exports = UtenteController
