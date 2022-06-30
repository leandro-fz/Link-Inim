const { listPost } = require("../model/dao/postDao");
const Post = require("../model/models/post"); console
const { logger } = require('../common/logging')

class PostController {

    // controlla se esiste l'id del post
    static async checkId(req, res, next) {
        try {
            if (req.params.idPost) {
                const eIntero = parseInt(req.params.idPost);
                if (isNaN(eIntero)) {
                    return res.status(400).send("id post non numerico");
                }
                let p;
                p = await Post.get(req.params.idPost);
                if (p) {
                    req.Post = p;
                    next();
                } else {
                    return res.status(404).send("Id post non trovato");
                }
            } else {
                return res.status(404).send("Id post NON Fornito");
            }
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    // mostra la lista di tutti i post
    static async lista(req, res) {
        let result = await listPost();
        logger.debug("PostController Lista ", result)
        return res.json(result).send();
    }

    // modifica il post con l'id specificato
    static async get(req, res) {
        let result;
        if (!req.Post) {
            result = await Post.get(req.params.id);
        } else {
            result = req.Post;
        }
        return res.json(result);

    }

    // inserisci un nuovo corso
    static async insert(req, res) {
        try {
            logger.debug("postController: insert: body: ", req.body);
            let np = new Post();
            if (req.body.Testo) np.setTesto(req.body.Testo);
            np.setDatetime(new Date());
            np.setIdUtente(req.idUtenteLogged);
            await np.save();
            res.status(200).send("Post creato");
        } catch (e) {
            logger.error("ERRORE INSERT DEI POST:", e);
            res.status(500).send("Internal Server Error");
        }
    }

    // modifica un corso esistente
    static async update(req, res) {
        try {
            logger.debug("PostController: UPDATE: body: ", req.body);
            let np = await Post.get(req.params.id);
            if (np.IdUtente == req.idUtenteLogged) {
                if (req.body.Testo) np.setTesto(req.body.Testo);
                np.setDatetime(new Date());
                np.setIdUtente(req.idUtenteLogged);
                logger.debug("PostController: UPDATE: Salvo post aggiornato: ", np);
                await np.save();
                res.status(200).send("Post modificato");
            }
            else {
                res.status(403).send("non autorizzato");
            }

        } catch (e) {
            logger.error("ERRORE PUT DEI POST:", e);
            res.status(500).send("Internal Server Error");
        }
    }

    // elimina un corso con l'id specificato
    static async delete(req, res) {
        try {
            logger.debug("PostController: DELETE: body: ", req.body);
            let result2 = await Post.get(req.params.id);
            if (result2.IdUtente == req.idUtenteLogged) {
                if (await Post.delete(req.params.id)) {
                    res.status(200).send('Post eliminato correttamente');
                } else {
                    res.status(400).send("something went wrong");
                }
            }
            else {
                res.status(403).send("non autorizzato");
            }
        } catch (e) {
            logger.error("ERRORE DELETE DEI POST: ", e);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = {
    PostController
}