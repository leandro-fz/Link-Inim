const { listCommentiPost } = require("../model/dao/commentiPostDao");
const CommentiPost = require("../model/models/commentiPost");

class CommentiPostController {

      // controlla se esiste l'id del commento
    static async checkIdCommento (req,res,next) {
        try {
            if (req.params.idCommentiPost ) {
                const eIntero = parseInt(req.params.idCommentiPost);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id post non numerico");
                }
                let p;
                p= await CommentiPost.get(req.params.idCommentiPost);
                if (p) {
                    req.CommentiPost=p;
                    next();
                }  else {
                    return res.status(404).send ("Id post non trovato");                    
                }               
            } else {
                return res.status(404).send("Id post NON Fornito");
            }
        } catch (err) {
            return res.status(500).send ("Internal Server Error");
        }            
    }


    // restituisce la lista dei commenti in base all'id del post
    static async lista (req, res) {
        let result = await listCommentiPost(req.params.idPost);
        return res.json(result).send();
    }

    // restituisce il commento con l'id passato
    static async get (req, res) {
        let result;
        if (! req.CommentiPost) {
            result = await CommentiPost.get(req.params.idCommentiPost);
        } else {
            result = req.CommentiPost;
        }
        return res.json(result);
    }

    // inserisce nuovo commento
    static async insert (req, res) {
        try {
            let np = new CommentiPost();
            if (req.body.Testo) np.setTesto(req.body.Testo);
            //if (req.body.Datetime) 
            np.setDatetime(new Date());
            //if (req.body.IdUtente)
            np.setIdUtente(req.idUtenteLogged);
            if (req.body.IdPost) np.setIdPost(req.body.IdPost);
            if (req.body.IdCommento) np.setIdCommento(req.body.IdCommento);
            await np.save();
            res.status(200).send("Commento pubblicato");
        } catch (e){
            res.status(500).send ("Internal Server Error");
            // console.log(e);
        }
    }

    // modifica un commento esistente
    static async update (req, res) {
        try {
            let np = await CommentiPost.get(req.params.idCommentiPost);

            if (req.body.Testo) np.setTesto(req.body.Testo);
            //if (req.body.Datetime) 
            np.setDatetime(new Date());
            //if (req.body.IdUtente)
            np.setIdUtente(req.idUtenteLogged);
            if (req.body.IdPost) np.setIdPost(req.body.IdPost);
            if (req.body.IdCommento) np.setIdCommento(req.body.IdCommento);
            await np.save();
            res.status(200).send("Commento modificato");
        } catch (e) {
            res.status(500).send ("Internal Server Error");
            // console.log(e);
        }
    }

    // cancella il commento con l'id specificato
    static async delete (req, res) {
        try {
            if (await CommentiPost.delete(req.params.idCommentiPost)) {
                res.status(200).send('successfully deleted');
            } else {
                res.status(400).send ("something went wrong");
            }
        } catch {
            res.status(500).send ("Internal Server Error");
        }
    }
}

module.exports = {
    CommentiPostController
}