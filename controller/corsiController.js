const { listCourses } = require("../model/dao/coursesDao");
const Courses = require("../model/models/corsi");

class CoursesController {

    static async checkId (req,res,next) {
        try {
            if (req.params.id ) {
                const eIntero = parseInt(req.params.id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id non numerico");
                }
                let p;
                p= await Courses.get(req.params.id);
                if (p) {
                    req.Utente=p;
                    next();
                }  else {
                    return res.status(404).send ("Id non trovato");                    
                }               
            } else {
                return res.status(404).send("Id NON Fornito");
            }
        } catch (err) {
            return res.status(500).send ("Internal Server Error");
        }            
    }


    static async lista (req, res) {
        // console.log('trying operatore controller...')
        let result = await listCourses();
        return res.json(result).send();
    }

    static async get (req, res) {
        let result;
        if (! req.Courses) {
            result = await Courses.get(req.params.id);
            console.log(result);
        } else {
            result = req.Courses;
        }
        console.log(result);
        return res.json(result);
    }

    static async insert (req, res) {
        try {
            let np = new Courses();
            if (req.body.Titolo) np.setTitolo(req.body.Titolo);
            if (req.body.Specializzazione) np.setSpecializzazione(req.body.Specializzazione);
            if (req.body.Durata) np.setDurata(req.body.Durata);
            if (req.body.Capitoli) np.setCapitoli(req.body.Capitoli);
            if (req.body.IdProf) np.setIdProf(req.body.IdProf);
            np.setIsDeleted(req.body.IsDeleted);
            await np.save();
            // return res.json({
            //     message: 'done'
            // }); 
            res.status(200).send("Ok");
        } catch (e){
            res.status(500).send ("Internal Server Error");
            console.log(e);
        }
    }

    static async update (req, res) {
        try {
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
        } catch {
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
        } catch {
            res.status(500).send ("Internal Server Error");
        }
    }
}

module.exports = {
    CoursesController
}