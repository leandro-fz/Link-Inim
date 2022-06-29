const Utente = require('../model/models/Utente')
const { listaUtenti } = require('../model/dao/utenteDao')
const { hash } = require('bcrypt');


class AdminController {
    static async checkId (req,res,next) {
        try {
            if (req.params.Id ) {
                const eIntero = parseInt(req.params.Id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("Id non numerico");
                }
                let p;
                p= await Utente.get(req.params.Id);
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

    //concede permessi di professore
    static async profPermission(req, res){
        try {
            let np;
            if ( ! req.Utente ) {
                np = await Utente.get(req.params.Id);
            } else {
                np = req.Utente;
            }
            let a = np.getIsProf()

            //np.setIsProf(!a) //se true o false
            a <= 0 ? np.setIsProf(1) : np.setIsProf(0)
            np.save()
            res.status(200).send("Ok");

        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    }

    static async edit (req,res) {
        try {
            let ns;
            if ( ! req.Utente ) {
                ns = await Utente.get(req.params.Id);
            } else {
                ns = req.Utente;
            }
            if (req.body.Nome) ns.setNome(req.body.Nome);
            if (req.body.Cognome) ns.setCognome(req.body.Cognome);
            if (req.body.CodFisc) ns.setCodFisc(req.body.CodFisc);
            if (req.body.Email) ns.setEmail(req.body.Email);
            if (req.body.Password){
                let newPassword = await hash(req.body.Password, 10);
                ns.setPassword(newPassword);
            } 
            if (req.body.DataDiNascita) ns.setDataDiNascita(req.body.DataDiNascita);
            ns.setMatching(req.body.Matching);
            ns.setProfEsterno(req.body.ProfEsterno);
            ns.setIban(req.body.Iban);
            if (req.body.ImmagineUrl) ns.setImmagineUrl(req.body.ImmagineUrl);
            ns.setIsAdmin(req.body.IsAdmin);
            ns.setMatching(req.body.Matching)
            ns.setIsDeleted(req.body.IsDeleted);
            ns.setIsProf(req.body.IsProf);
            if (req.body.DataAssunzione) ns.setDataAssunzione(req.body.DataAssunzione);
            await  ns.save();
            res.status(200).send("Ok");
        } catch (err) {
            console.log(err);
            res.status(500).send ("Internal Server Error");
        }
    }


    static async lista(req, res) {
        const listaUt = await listaUtenti();
        return res.json(listaUt).send()
    }

    static async get (req,res) {
        let result;
        if ( ! req.Utente ) {
            result = await Utente.get(req.params.Id);
        } else {
            result = req.Utente;
        }
        return res.json(result);
    }

    static async elimina (req,res) {
        try {
            if (await Utente.delete(req.params.Id) ) {
                res.status(200).send('Ok');
            } else {
                res.status(400).send ("Errore Cancellazione Utente");
            }
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    }


    static async creaUtente(req, res) {
        try {
            let ns = new Utente();

            if (req.body.Nome) ns.setNome(req.body.Nome);
            if (req.body.Cognome) ns.setCognome(req.body.Cognome);
            if (req.body.CodFisc) ns.setCodFisc(req.body.CodFisc);
            if (req.body.Email) ns.setEmail(req.body.Email);
            if (req.body.Password){
                let newPassword = await hash(req.body.Password, 10);
                ns.setPassword(newPassword);
            } 
            if (req.body.DataDiNascita) ns.setDataDiNascita(req.body.DataDiNascita);
            ns.setMatching(req.body.Matching);
            ns.setProfEsterno(req.body.ProfEsterno);
            ns.setIban(req.body.Iban);
            if (req.body.ImmagineUrl) ns.setImmagineUrl(req.body.ImmagineUrl);
            ns.setIsAdmin(req.body.IsAdmin);
            ns.setIsDeleted(req.body.IsDeleted);
            ns.setIsProf(req.body.IsProf);
            if (req.body.DataAssunzione) ns.setDataAssunzione(req.body.DataAssunzione);

            await ns.save()
            res.status(201).send("Created");
        } catch(err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    }

}


module.exports = AdminController;