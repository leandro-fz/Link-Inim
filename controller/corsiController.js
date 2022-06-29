const { listCourses } = require("../model/dao/coursesDao");
const Courses = require("../model/models/corsi");
const { logger } = require('../common/logging')

class CoursesController {
    static async lista (req, res) {
        logger.debug("CorsoController Lista req.params.id:", req.params.id)
        let result = await listCourses();
        return res.json(result).send();
    }

    static async get (req, res) {
        let result;
        logger.debug("CorsoController GET req.params.id:", req.params.id)
        if (! req.Courses) {
            result = await Courses.get(req.params.id);
        } else {
            result = req.Courses;
        }
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
            if (req.body.IdProf) np.setIdProf(req.body.IdProf);
            if (req.body.IsDeleted) np.setIsDeleted(req.body.IsDeleted);
            await np.save();
            // return res.json({
            //     message: 'done'
            // }); 
            res.status(200).send("Ok");
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
            if (req.body.Titolo) np.setTitolo(req.body.Titolo);
            if (req.body.Specializzazione) np.setSpecializzazione(req.body.Specializzazione);
            if (req.body.Durata) np.setDurata(req.body.Durata);
            if (req.body.Capitoli) np.setCapitoli(req.body.Capitoli);
            if (req.body.IdProf) np.setIdProf(req.body.IdProf);
            if (req.body.IsDeleted) np.setIsDeleted(req.body.IsDeleted);
            await np.save();
            // return res.json({
            //     message: 'done'
            // }); 
            res.status(200).send("Ok");
        } catch (e){
            logger.error ("ERRORE Update CorsiController:", e);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async delete (req, res) {
        try {
            if (await Courses.delete(req.params.id)) {
                res.status(200).send('ok');
            } else {
                res.status(400).send ("something went wrong");
            }
        // return res.json({
        //     message: 'successfully deleted'
        // }); 
        } catch (e){
            logger.error ("ERRORE Delete CorsiController:", e);
            res.status(500).send ("Internal Server Error");
        }
    }
}

module.exports = {
    CoursesController
}