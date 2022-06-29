const { listCourses } = require("../model/dao/coursesDao");
const Utente = require("../model/models/utente");

class UtenteController {
    static async myProfile(req, res) {
        try {
            let result;
            if (!req.Utente) {
                result = await Utente.get(req.params.id);
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
            if ( ! req.Utente ) {
                np = await Utente.get(req.params.id);
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

    static async cambiaMatching(req, res) {
        try {
            let np;
            if ( ! req.Utente ) {
                np = await Utente.get(req.params.id);
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


}


module.exports = {
    UtenteController
}