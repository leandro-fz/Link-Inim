const { listaNomiSpecializzazioni, listaPersoneDisponibili, getSpecializzazioniById } = require("../model/dao/matchingDao");

class MatchingController {

    // controlla se esiste l'id del matching
    static async checkId(req, res, next) {
        try {
            if (req.params.Idspecializzazione) {
                const eIntero = parseInt(req.params.Idspecializzazione);
                if (isNaN(eIntero)) {
                    return res.status(400).send("id specializzazione non numerico");
                }
                let p;
                p = await getSpecializzazioniById(req.params.Idspecializzazione);
                if (p) {
                    req.Specializzazione = p;
                    next();
                } else {
                    return res.status(404).send("Idspecializzazione non trovato");
                }
            } else {
                return res.status(404).send("Idspecializzazione NON Fornito");
            }
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    // prende tutte le specializzazioni
    static async getNomiSpecializzazioni(req, res) {
        try {
            let result = await listaNomiSpecializzazioni()
            return res.json(result).send();
        } catch (error) {
            res.status(500).send("Internal Server Error")
        }
    }

    // prende la lista degli utenti disponibili
    static async listaUtentiDisponibili(req, res) {
        try {
            let result = await listaPersoneDisponibili(req.params.Idspecializzazione)
            return res.json(result).send();
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error")
        }
    }

}

module.exports = MatchingController;