const { listPost } = require("../model/dao/postDao");
const Post = require("../model/models/post");console
const { logger } = require('../common/logging')

class PostController {
    static async lista (req, res) {
        let result = await listPost();
        logger.debug("PostController Lista ", result)
        return res.json(result).send();
    }

    static async get (req, res) {
        let result;
        if (! req.Post) {
            result = await Post.get(req.params.id);
        } else {
            result = req.Post; 
        }
        return res.json(result);
        
    }

    static async insert (req, res) {
        try {
            logger.debug ("postController: insert: body: ", req.body);
            let np = new Post();
            if (req.body.Testo) np.setTesto(req.body.Testo);
            np.setDatetime( new Date());
            if (req.body.IdUtente) np.setIdUtente(req.body.IdUtente);
            await np.save();
            res.status(200).send("Ok");
        } catch (e){
            logger.error ("ERRORE INSERT DEI POST:", e);
            res.status(500).send ("Internal Server Error");
            console.log(e);
        }
    }

    static async update (req, res) {
        try {
            logger.debug ("PostController: UPDATE: body: ", req.body);
            let np = await Post.get(req.params.id);
            if (req.body.Testo) np.setTesto(req.body.Testo);
            np.setDatetime( new Date());
            if (req.body.IdUtente) np.setIdUtente(req.body.IdUtente);
            logger.debug ("PostController: UPDATE: Salvo post aggiornato: ", np);
            await np.save();
          
            res.status(200).send("Ok");
        } catch (e){
            logger.error ("ERRORE PUT DEI POST:", e);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async delete (req, res) {
        try {
            logger.debug ("PostController: DELETE: body: ", req.body);
            if (await Post.delete(req.params.id)) {
                res.status(200).send('ok');
            } else {
                res.status(400).send ("something went wrong");
            }
        // return res.json({
        //     message: 'successfully deleted'
        // }); 
        } catch (e){
            logger.error ("ERRORE DELETE DEI POST: ", e);
            res.status(500).send ("Internal Server Error");
        }
    }
}

module.exports = {
    PostController
}