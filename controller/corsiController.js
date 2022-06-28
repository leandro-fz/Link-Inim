const Courses = require("../model/models/corsi");

class CoursesController {
    static async lista (req, res) {
        // console.log('trying operatore controller...')
        let result = await Courses.lista();
        return res.json(result);
    }

    static async get (req, res) {
        let result;
        if (! req.Courses) {
            result = await Courses.get(req.params.id);
        } else {
            result = req.Courses;
        }
        return res.json(result);
    }

    static async insert (req, res) {
        try {
            let np = new Courses();
            if (req.body.titolo) np.setTitolo(req.body.titolo);
            if (req.body.specializzazione) np.setSpecializzazione(req.body.specializzazione);
            if (req.body.durata) np.setDurata(req.body.durata);
            if (req.body.capitoli) np.setCapitoli(req.body.capitoli);
            if (req.body.idProf) np.setIdProf(req.body.idProf);
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
            if (req.body.titolo) np.setTitolo(req.body.titolo);
            if (req.body.specializzazione) np.setSpecializzazione(req.body.specializzazione);
            if (req.body.durata) np.setDurata(req.body.durata);
            if (req.body.capitoli) np.setCapitoli(req.body.capitoli);
            if (req.body.idProf) np.setIdProf(req.body.idProf);
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