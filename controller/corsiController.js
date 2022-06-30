const { listCourses } = require("../model/dao/coursesDao");
const Courses = require("../model/models/corsi");
const { logger } = require('../common/logging')

class CoursesController {

    static async checkId (req,res,next) {
        try {
            if (req.params.idCorsi ) {
                const eIntero = parseInt(req.params.idCorsi);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id corsi non numerico");
                }
                let p;
                p= await Courses.get(req.params.idCorsi);
                if (p) {
                    req.Courses=p;
                    next();
                }  else {
                    return res.status(404).send ("Id corsi non trovato");                    
                }               
            } else {
                return res.status(404).send("Id corsi NON Fornito");
            }
        } catch (err) {
            return res.status(500).send ("Internal Server Error");
        }            
    }


    static async lista (req, res) {
        logger.debug("CorsoController Lista req.params.id:", req.params.id)
        let result = await listCourses();
        return res.json(result).send();
    }

    static async get (req, res) {
        let result;
        logger.debug("CorsoController GET req.params.id:", req.params.id)
        if (! req.Courses) {
            result = await Courses.get(req.params.idCorsi);
            console.log(result);
        } else {
            result = req.Courses;
        }
        console.log(result);
        return res.json(result);
    }

    static async insert (req, res) {
        try {
            logger.debug ("CoursesController: insert: body: ", req.body);
            let np = new Courses();
            if (req.body.Titolo) np.setTitolo(req.body.Titolo);
            if (req.body.Specializzazione) np.setSpecializzazione(req.body.Specializzazione);
            if (req.body.Durata) np.setDurata(req.body.Durata);
            if (req.body.Capitoli) np.setCapitoli(req.body.Capitoli);
            np.setIdProf(req.idUtenteLogged);
            if (req.body.IsDeleted !== null) np.setIsDeleted(req.body.IsDeleted);

            await np.save(); 
            res.status(200).send("Corso inserito");
        } catch (e){
            logger.error ("ERRORE INSERT CorsiController:", e);
            res.status(500).send ("Internal Server Error");
            console.log(e);
        }
    }

    static async update (req, res) {
        try {
            logger.debug ("CoursesController: update: body: ", req.body);
            let np = await Courses.get(req.params.id);
            if(req.body.Titolo) np.setTitolo(req.body.Titolo);
            if (req.body.Specializzazione) np.setSpecializzazione(req.body.Specializzazione);
            if (req.body.Durata) np.setDurata(req.body.Durata);
            if (req.body.Capitoli) np.setCapitoli(req.body.Capitoli);
            np.setIdProf(req.idUtenteLogged);
            if (req.body.IsDeleted !== null) np.setIsDeleted(req.body.IsDeleted);
            await np.save();
            res.status(200).send("Corso modificato");
        } catch (e){
            logger.error ("ERRORE Update CorsiController:", e);
            res.status(500).send ("Internal Server Error");
            console.log(e);
        }
    }

    static async delete (req, res) {
        try {
            if (await Courses.delete(req.params.idCorsi)) {
                res.status(200).send('corso cancellato');
            } else {
                res.status(400).send ("something went wrong");
            }
        } catch (e){
            logger.error ("ERRORE Delete CorsiController:", e);
            res.status(500).send ("Internal Server Error");
        }
    }
}

module.exports = {
    CoursesController
}