const { getUtenteByEmailDAO} = require('../dao/utenteDao');

class Utente {
    constructor(p) {
        if (p) {
            if (p.id) this.id = p.id;
            if (p.Nome) this.Nome = p.Nome;
            if (p.Cognome) this.Cognome = p.Cognome;
            if (p.CodFiscale) this.CodFiscale = p.CodFiscale;
            if (p.Email) this.Email = p.Email;
            if (p.Password) this.Password = p.Password;
            if (p.DataDiNascita) this.DataDiNascita = p.DataDiNascita;
            if (p.Matching) this.Matching = p.Matching;
            if (p.ProfEsterno) this.ProfEsterno = p.ProfEsterno;
            if (p.Iban) this.Iban = p.Iban;
            if (p.ImmagineUrl) this.ImmagineUrl = p.ImmagineUrl;
            if (p.DataAssunzione) this.DataAssunzione = p.DataAssunzione;
            if (p.IsAdmin) this.IsAdmin = p.IsAdmin;
        }
    }


    static async getUtenteByEmail(utente) {
        const ut = await getUtenteByEmailDAO(utente);
        const obj = new Utente(ut)
        return obj
    }

    // static async lista() {
    //     let listaOperatoriDAO = await listaOperatore();
    //     let res = [];

    //     listaOperatoriDAO.forEach(e => {
    //         res.push(new Operatore(e));
    //     });
    //     return res;
    // }

    // static async get(id) {
    //     let pf = await getUtenteById(id);
    //     if (pf) { return new Operatore(pf); }
    //     return null;
    // }

    // static async exists(id) {
    //     return await utenteExistById(id);
    // }

    // static async find(id) {
    //     return await utenteExistById(id);
    // }

    // static async delete(id) {
    //     return await utenteDeleteById(id);
    // }

    // setId(x) {
    //     if (x == null || typeof (x) == 'undefined') throw 'Nome cannot be null';
    //     this.id = x;
    // }
    getId() {
        return this.id;
    }

    setId(x) {
        if (x == null || typeof (x) == 'undefined') throw 'ID cannot be null';
        this.id = x;
    }

    // existId() {
    //     if (this.id == null || typeof (this.id) == 'undefined') return false;
    //     return true;
    // }
    setNome(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Nome cannot be null';
        this.Nome = x;
    }
    getNome() {
        return this.Nome;
    }

    setCognome(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Cognome cannot be null';
        this.Cognome = x;
    }
    getCognome() {
        return this.Cognome;
    }

    setCodFiscale(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Codice Fiscale cannot be null';
        this.CodFiscale = x;
    }
    getCodFiscale() {
        return this.CodFiscale;
    }
    setEmail(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Email cannot be null';
        this.Email = x;
    }
    getEmail() {
        return this.Email;
    }
    setPassword(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Password cannot be null';
        this.password = x;
    }
    getPassword() {
        return this.password;
    }
    setDataDiNascita(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Password cannot be null';
        this.DataDiNascita = x;
    }
    getDataDiNascita() {
        return this.DataDiNascita;
    }
    setMatching(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Matching cannot be null';
        this.Matching = x;
    }
    getMatching() {
        return this.Matching;
    }
    setProfEsterno(x) {
        if (x == null || typeof (x) == 'undefined') throw 'ProfEsterno cannot be null';
        this.ProfEsterno = x;
    }
    getProfEsterno() {
        return this.ProfEsterno;
    }
    setIban(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Iban cannot be null';
        this.Iban = x;
    }
    getIban() {
        return this.Iban;
    }
    setImmagineUrl(x) {
        if (x == null || typeof (x) == 'undefined') throw 'ImmagineUrl cannot be null';
        this.ImmagineUrl = x;
    }
    getIban() {
        return this.ImmagineUrl;
    }

    setIsAdmin(x){
        this.IsAdmin = x;

    }

    getIsAdmin(){
        return this.IsAdmin;
    }

    setDataAssunzione(x) {
        if (x == null || typeof (x) == 'undefined') throw 'DataAssunzione cannot be null';
        this.DataAssunzione = x;
    }
    getDataAssunzione() {
        return this.DataAssunzione;
    }

    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null) {
            let res = await updateUtente(this.id, this.Nome, this.Cognome, this.CodFiscale, this.Email, this.Password, this.DataDiNascita, this.Matching, this.ProfEsterno, this.Iban, this.ImmagineUrl, this.DataAssunzione, this.IsAdmin
            );
            if (!res) {
                throw 'save Utente failed (update case).';
            }
        } else {
            let res = await insertUtente(this.Nome, this.Cognome, this.CodFiscale, this.Email, this.Password, this.DataDiNascita, this.Matching, this.ProfEsterno, this.Iban, this.ImmagineUrl, this.DataAssunzione, this.IsAdmin
            );
            this.setId(res);
            if (!res) throw 'save Utente failed (insert case).';
        }
    }
}

module.exports = Utente;