const { listQuiz, insertQuiz, getQuizById, deleteQuiz, updateQuiz } = require('../dao/quizDao');

class Quiz {
    constructor(p) {
        if (p) {
            if (p.Id) this.Id = p.Id;
            if (p.IdCorso) this.IdCorso = p.IdCorso;
            if (p.Domanda) this.Domanda = p.Domanda;

            if (p.RispostaCorretta) this.RispostaCorretta = p.RispostaCorretta;
            if (p.RerrataErrata1) this.RispostaErrata1 = p.RispostaErrata1;
            if (p.RispostaErrata2) this.RispostaErrata2 = p.RispostaErrata2;
            if (p.RispostaErrata3) this.RispostaErrata3 = p.RispostaErrata3;
        }
    }

    // restituisce la lista di tutti i quiz
    static async lista() {
        let listaQuizDAO = await listQuiz();
        let res = [];
        listaQuizDAO.forEach(e => {
            res.push(new Quiz(e));
        });
        return res;
    }

    // restituisce il quiz in base all'id passato
    static async get(Id) {
        let pf = await getQuizById(Id);
        if (pf) { return new Quiz(pf); }
        return null;
    }

    static async delete(Id) {
        return await deleteQuiz(Id);
    }

    // get/set id quiz
    getId() {
        return this.Id;
    }

    setId(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Id cannot be null';
        this.Id = x;
    }

    // get/set id corso
    getIdCorso() {
        return this.IdCorso;
    }

    setIdCorso(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Text field cannot be null';
        this.IdCorso = x;
    }

    // get/set domanda quiz
    getDomanda() {
        return this.Domanda;
    }

    setDomanda(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Domanda cannot be null';
        this.Domanda = x;
    }

    // get/set risposta corretta del quiz
    setRispostaCorretta(x) {
        if (x == null || typeof (x) == 'undefined') throw 'RispostaCorretta cannot be null';
        this.RispostaCorretta = x;
    }
    getRispostaCorretta() {
        return this.RispostaCorretta;
    }

    // get/set risposta errata 1 del quiz
    setRispostaErrata1(x) {
        if (x == null || typeof (x) == 'undefined') throw 'RispostaErrata1 cannot be null';
        this.RispostaErrata1 = x;
    }
    getRispostaErrata1() {
        return this.RispostaErrata1;
    }

    // get/set risposta errata 2 del quiz
    setRispostaErrata2(x) {
        if (x == null || typeof (x) == 'undefined') throw 'RispostaErrata2 cannot be null';
        this.RispostaErrata2 = x;
    }
    getRispostaErrata2() {
        return this.RispostaErrata2;
    }

    // get/set risposta errata 3 del quiz
    setRispostaErrata3(x) {
        if (x == null || typeof (x) == 'undefined') throw 'RispostaErrata3 cannot be null';
        this.RispostaErrata3 = x;
    }
    getRispostaErrata3() {
        return this.RispostaErrata3;
    }

    // crea un nuovo quiz o modifica un quiz esistente
    async save() {
        if (typeof (this.Id) != 'undefined' && this.Id != null) {
            let res = await updateQuiz(this.Id, this.IdCorso, this.Domanda, this.RispostaCorretta, this.RispostaErrata1, this.RispostaErrata2, this.RispostaErrata3
            );
            if (!res) {
                throw 'save Quiz failed (update case).';
            }
        } else {
            let res = await insertQuiz(this.IdCorso, this.Domanda, this.RispostaCorretta, this.RispostaErrata1, this.RispostaErrata2, this.RispostaErrata3
            );
            this.setId(res);
            if (!res) throw 'save Quiz failed (insert case).';
        }
    }
}

module.exports = Quiz;