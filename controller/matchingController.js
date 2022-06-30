const { listaNomiSpecializzazioni } = require("../model/dao/matchingDao");



class MatchingController{

    static async getNomiSpecializzazioni(req, res){
        try {
            let result = await listaNomiSpecializzazioni() 
            return res.json(result).send();            
        } catch (error) {
            res.status(500).send("Internal Server Error")
        }
    }

    static async listaUtentiDisponibili(req, res){
        try {
            //req.params.Idspecializzazione
            let result = await listaPersoneDisponibili(req.params.IdSpecializzazioni)
            return res.json(result).send();
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error")
        }
    }

}

module.exports = MatchingController;