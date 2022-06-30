const { listCourses, insertCourses, getCoursesById, deleteCourses, updateCourses} = require('../dao/coursesDao');
const { logger } = require('../../common/logging')

class Courses {
    constructor(p) {
        if (p) {
            if (p.Id) this.Id = p.Id;
            if (p.Titolo) this.Titolo = p.Titolo;
            if (p.Specializzazione) this.Specializzazione = p.Specializzazione;
            if (p.Durata) this.Durata = p.Durata;
            if (p.Capitoli) this.Capitoli = p.Capitoli;
            if (p.IsDeleted !== null) this.IsDeleted = p.IsDeleted;

            if (p.IdProf) this.IdProf = p.IdProf;

        }
    }


    // restituisce la lista di tutti i corsi
    static async lista () {
        let listaCorsiDAO = await listCourses();
        let res = [];
        listaCorsiDAO.forEach(e => {
            res.push(new Courses(e));
        });
        return res;
    }

    // restituisce un corso in base all'id
    static async get(Id) {
        let pf = await getCoursesById(Id);
        logger.debug("Model Corso Get singolo: ", pf)
        if (pf) { return new Courses(pf); }

        return null;
    }

    // elimina un corso in base all'id
    static async delete(Id) {
        return await deleteCourses(Id);
    }

    // get/set id corso
    getId() {
        return this.Id;
    }

    setId(x) {
        if (x == null || typeof (x) == 'undefined') throw 'ID cannot be null';
        this.Id = x;
    }

    // get/set idprof corso
    getIdProf() {
        return this.IdProf;
    }

    setIdProf(x) {
        if (x == null || typeof (x) == 'undefined') throw 'IDProf cannot be null';
        this.IdProf = x;
    }

    // get/set isdeleted corso
    getIsDeleted() {
        return this.IsDeleted;
    }

    setIsDeleted(x) {
        if (x == null || typeof (x) == 'undefined') throw 'IsDeleted cannot be null';
        this.IsDeleted = x;
    }

    // get/set titolo corso
    setTitolo(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Titolo cannot be null';
        this.Titolo = x;
    }
    getTitolo() {
        return this.Titolo;
    }

    // get/set specializzazione corso
    setSpecializzazione(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Specializzazione cannot be null';
        this.Specializzazione = x;
    }
    getSpecializzazione() {
        return this.Specializzazione;
    }

    // get/set durata corso
    setDurata(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Durata cannot be null';
        this.Durata = x;
    }
    getDurata() {
        return this.Durata;
    }

    // get/set capitoli corso
    setCapitoli(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Capitoli cannot be null';
        this.Capitoli = x;
    }
    getCapitoli() {
        return this.Capitoli;
    }

    // crea nuovo corso o modifica un corso esistente
    async save() {
        if (typeof (this.Id) != 'undefined' && this.Id != null) {
            let res = await updateCourses(this.Id, this.Titolo, this.Specializzazione, this.Durata, this.Capitoli, this.IdProf, this.IsDeleted
            );
            if (!res) {
                throw 'save Courses failed (update case).';
            }
        } else {
            let res = await insertCourses(this.Titolo, this.Specializzazione, this.Durata, this.Capitoli, this.IdProf, this.IsDeleted
            );
            this.setId(res);
            if (!res) throw 'save Courses failed (insert case).';
        }
    }
}

module.exports = Courses;