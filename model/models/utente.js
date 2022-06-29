const { getUtenteByEmailDAO, insertUtente, getUtenteById, utenteDeleteById , updateUtente} = require('../dao/utenteDao');

class Utente {
    constructor(p) {
        if (p) {
            if (p.id) this.id = p.id;
            if (p.Nome) this.Nome = p.Nome;
            if (p.Cognome) this.Cognome = p.Cognome;
            if (p.CodFisc) this.CodFisc = p.CodFisc;
            if (p.Email) this.Email = p.Email;
            if (p.Password) this.Password = p.Password;
            if (p.DataDiNascita) this.DataDiNascita = p.DataDiNascita;
            if (p.Matching !== null) this.Matching = p.Matching;
            if (p.ProfEsterno!== null) this.ProfEsterno = p.ProfEsterno;
            if (p.Iban !== null) this.Iban = p.Iban;
            if (p.ImmagineUrl) this.ImmagineUrl = p.ImmagineUrl;
            if (p.DataAssunzione) this.DataAssunzione = p.DataAssunzione;
            if (p.IsAdmin!== null) this.IsAdmin = p.IsAdmin;
            if (p.IsDeleted!== null) this.IsDeleted = p.IsDeleted;
            if (p.IsProf !== null) this.IsProf = p.IsProf;
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

    static async get(id) {
        let pf = await getUtenteById(id);
        if (pf) { return new Utente(pf); }
        return null;
    }

    // static async exists(id) {
    //     return await utenteExistById(id);
    // }

    // static async find(id) {
    //     return await utenteExistById(id);
    // }

    static async delete(id) {
        return await utenteDeleteById(id);
    }

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

    setCodFisc(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Codice Fiscale cannot be null';
        this.CodFisc = x;
    }
    getCodFisc() {
        return this.CodFisc;
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

    setIsAdmin(x) {
        if (x == null || typeof (x) == 'undefined') throw 'IsAdmin cannot be null';
        this.IsAdmin = x;
    }

    getIsAdmin() {
        return this.IsAdmin;
    }
    setIsDeleted(x) {
        if (x == null || typeof (x) == 'undefined') throw 'IsDeleted cannot be null';

        this.IsDeleted = x;
    }


    getIsDeleted() {
        return this.IsDeleted;
    }

    getIsProf() {
        return this.IsProf;
    }
    setIsProf(x) {
        if (x == null || typeof (x) == 'undefined') throw 'IsProf cannot be null';

        this.IsProf = x;
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
            let res = await updateUtente(this.id, this.Nome, this.Cognome, this.CodFisc, this.Email, this.Password, this.DataDiNascita, this.Matching, this.ProfEsterno, this.Iban, this.ImmagineUrl, this.DataAssunzione, this.IsAdmin, this.IsDeleted, this.IsProf
            );
            if (!res) {
                throw 'save Utente failed (update case).';
            }
        } else {
            let res = await insertUtente(this.Nome, this.Cognome, this.CodFisc, this.Email, this.Password, this.DataDiNascita, this.Matching, this.ProfEsterno, this.Iban, this.ImmagineUrl, this.DataAssunzione, this.IsAdmin, this.IsDeleted, this.IsProf
            );
            this.setId(res);
            if (!res) throw 'save Utente failed (insert case).';
        }
    }
}

module.exports = Utente;