const { listCourses } = require("../model/dao/coursesDao");
const Courses = require("../model/models/corsi");
const { logger } = require('../common/logging')

class CoursesController {

    // controlla se esiste l'id del corso
    static async checkId(req, res, next) {
        try {
            if (req.params.idCorsi) {
                const eIntero = parseInt(req.params.idCorsi);
                if (isNaN(eIntero)) {
                    return res.status(400).send("id corsi non numerico");
                }
                let p;
                p = await Courses.get(req.params.idCorsi);
                if (p) {
                    req.Courses = p;
                    next();
                } else {
                    return res.status(404).send("Id corsi non trovato");
                }
            } else {
                return res.status(404).send("Id corsi NON Fornito");
            }
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }


    // mostra la lista di tutti i corsi
    static async lista(req, res) {
        logger.debug("CorsoController Lista req.params.id:", req.params.id)
        let result = await listCourses();
        return res.json(result).send();
    }

    // mostra il corso in base all'id specificato
    static async get(req, res) {
        let result;
        logger.debug("CorsoController GET req.params.id:", req.params.id)
        if (!req.Courses) {
            result = await Courses.get(req.params.idCorsi);
        } else {
            result = req.Courses;
        }
        return res.json(result);
    }

    // inserisci un nuovo corso
    static async insert(req, res) {
        try {
            logger.debug("CoursesController: insert: body: ", req.body);
            let np = new Courses();
            if (req.body.Titolo) np.setTitolo(req.body.Titolo);
            if (req.body.Specializzazione) np.setSpecializzazione(req.body.Specializzazione);
            if (req.body.Durata) np.setDurata(req.body.Durata);
            if (req.body.Capitoli) np.setCapitoli(req.body.Capitoli);
            np.setIdProf(req.idUtenteLogged);
            if (req.body.IsDeleted !== null) np.setIsDeleted(req.body.IsDeleted);

            await np.save();
            res.status(200).send("Corso inserito");
        } catch (e) {
            logger.error("ERRORE INSERT CorsiController:", e);
            res.status(500).send("Internal Server Error");
        }
    }

    // modifica un corso esistente
    static async update(req, res) {
        try {
            logger.debug("CoursesController: update: body: ", req.body);

            let np = await Courses.get(req.params.id);
            if (np.IdProf == req.idUtenteLogged) {
                if (req.body.Titolo) np.setTitolo(req.body.Titolo);
                if (req.body.Specializzazione) np.setSpecializzazione(req.body.Specializzazione);
                if (req.body.Durata) np.setDurata(req.body.Durata);
                if (req.body.Capitoli) np.setCapitoli(req.body.Capitoli);
                np.setIdProf(req.idUtenteLogged);
                if (req.body.IsDeleted !== null) np.setIsDeleted(req.body.IsDeleted);
                await np.save();
                res.status(200).send("Corso modificato");
            } else {
                res.status(403).send('non autorizzato')
            }

        } catch (e) {
            logger.error("ERRORE Update CorsiController:", e);
            res.status(500).send("Internal Server Error");
            // console.log(e);
        }
    }

    // elimina il corso con l'id specificato
    static async delete(req, res) {
        try {
            let result2 = await Courses.get(req.params.idCorsi)
            if (result2.IdProf == req.idUtenteLogged) {
                if (await Courses.delete(req.params.idCorsi)) {
                    res.status(200).send('corso cancellato');
                } else {
                    res.status(400).send("something went wrong");
                }
            } else {
                res.status(403).send('non autorizzato')
            }

        } catch (e) {
            logger.error("ERRORE Delete CorsiController:", e);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = {
    CoursesController
}