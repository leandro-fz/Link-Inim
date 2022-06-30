const { listComments } = require("../model/dao/commentsDao");
const Comments = require("../model/models/commenti");

class CommentsController {

    // controlla se esiste l'id del commento
    static async checkId(req, res, next) {
        try {
            if (req.params.idCommenti) {
                const eIntero = parseInt(req.params.idCommenti);
                if (isNaN(eIntero)) {
                    return res.status(400).send("id commenti non numerico");
                }
                let p;
                p = await Comments.get(req.params.idCommenti);
                if (p) {
                    req.Comments = p;
                    next();
                } else {
                    return res.status(404).send("Id commenti non trovato");
                }
            } else {
                return res.status(404).send("Id commenti NON Fornito");
            }
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    // restituisce la lista dei commenti in base all'id del corso
    static async lista(req, res) {
        let result = await listComments(req.params.idCorsi);
        return res.json(result).send();
    }

    // restituisce il commento con l'id passato
    static async get(req, res) {
        let result;
        if (!req.Comments) {
            result = await Comments.get(req.params.idCommenti);
            console.log(result);
        } else {
            result = req.Comments;
        }
        console.log(result);
        return res.json(result);
    }

    // inserisce nuovo commento
    static async insert(req, res) {
        try {
            let np = new Comments();
            if (req.body.Testo) np.setTesto(req.body.Testo);
            //if (req.body.Datetime) 
            np.setDatetime(new Date());
            //if (req.body.IdUtente)
            np.setIdUtente(req.idUtenteLogged);
            if (req.body.IdCorso) np.setIdCorso(req.body.IdCorso);
            await np.save();
            res.status(200).send("Commento pubblicato");
        } catch (e) {
            res.status(500).send("Internal Server Error");
            console.log(e);
        }
    }

    // modifica un commento esistente
    static async update(req, res) {
        try {
            let np = await Comments.get(req.params.idCommenti);
            if (np.IdUtente == req.idUtenteLogged) {
                if (req.body.Testo) np.setTesto(req.body.Testo);
                //if (req.body.Datetime) 
                np.setDatetime(new Date());
                //if (req.body.IdUtente)
                np.setIdUtente(req.idUtenteLogged);
                if (req.body.IdCorso) np.setIdCorso(req.body.IdCorso);
                await np.save();
                res.status(200).send("Commento modificato");
            } else {
                res.status(403).send('non autorizzato')
            }

        } catch (e) {
            res.status(500).send("Internal Server Error");
            console.log(e);
        }
    }

    // cancella il commento con l'id specificato
    static async delete(req, res) {
        try {
            let result2 = await Comments.get(req.params.idCommenti)
            if (result2.IdUtente == req.idUtenteLogged) {
                if (await Comments.delete(req.params.idCommenti)) {
                    res.status(200).send('successfully deleted');
                } else {
                    res.status(400).send("something went wrong");
                }
            } else {
                res.status(403).send("non autorizzato");
            }

        } catch {
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = {
    CommentsController
}