const { listQuiz } = require("../model/dao/quizDao");
const Quiz = require("../model/models/quiz");

class QuizController {

      // controlla se esiste l'id del quiz
    static async checkId (req,res,next) {
        try {
            if (req.params.idQuiz ) {
                const eIntero = parseInt(req.params.idQuiz);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id quiz non numerico");
                }
                let p;
                p= await Quiz.get(req.params.idQuiz);
                if (p) {
                    req.Quiz=p;
                    next();
                }  else {
                    return res.status(404).send ("Id quiz non trovato");                    
                }               
            } else {
                return res.status(404).send("Id quiz NON Fornito");
            }
        } catch (err) {
            return res.status(500).send ("Internal Server Error");
        }            
    }

    // mostra il quiz in base all'id specificato
    static async get (req, res) {
        let result;
        if (! req.Quiz) {
            result = await Quiz.get(req.params.idQuiz);
            // console.log(result);
        } else {
            result = req.Quiz;
        }
        // console.log(result);
        return res.json(result);
    }

    // inserisci un nuovo quiz
    static async insert (req, res) {
        try {
            let np = new Quiz();
            if (req.body.Domanda) np.setDomanda(req.body.Domanda);
            //if (req.body.RispostaCorretta) 
            if (req.body.RispostaCorretta) np.setRispostaCorretta(req.body.RispostaCorretta);
            //if (req.body.RispostaErrata1) 
            if (req.body.RispostaErrata1) np.setRispostaErrata1(req.body.RispostaErrata1);
            //if (req.body.RispostaErrata2) 
            if (req.body.RispostaErrata2) np.setRispostaErrata2(req.body.RispostaErrata2);
            //if (req.body.RispostaErrata3) 
            if (req.body.RispostaErrata3) np.setRispostaErrata3(req.body.RispostaErrata3);
            if (req.body.IdCorso) np.setIdCorso(req.body.IdCorso);
            await np.save();
            res.status(200).send("Quiz pubblicato");
        } catch (e){
            res.status(500).send ("Internal Server Error");
            // console.log(e);
        }
    }

    // modifica un quiz esistente
    static async update (req, res) {
        try {
            let np = await Quiz.get(req.params.idQuiz);

            if (req.body.Domanda) np.setDomanda(req.body.Domanda);
            //if (req.body.RispostaCorretta) 
            if (req.body.RispostaCorretta) np.setRispostaCorretta(req.body.RispostaCorretta);
            //if (req.body.RispostaErrata1) 
            if (req.body.RispostaErrata1) np.setRispostaErrata1(req.body.RispostaErrata1);
            //if (req.body.RispostaErrata2) 
            if (req.body.RispostaErrata2) np.setRispostaErrata2(req.body.RispostaErrata2);
            //if (req.body.RispostaErrata3) 
            if (req.body.RispostaErrata3) np.setRispostaErrata3(req.body.RispostaErrata3);
            if (req.body.IdCorso) np.setIdCorso(req.body.IdCorso);
            await np.save();
            res.status(200).send("Quiz modificato");
        } catch (e) {
            res.status(500).send ("Internal Server Error");
            // console.log(e);
        }
    }

    // elimina un corso con l'id specificato
    static async delete (req, res) {
        try {
            if (await Quiz.delete(req.params.idQuiz)) {
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
    QuizController
}