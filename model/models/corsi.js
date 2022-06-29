const { listCourses, insertCourses, getCoursesById, deleteCourses, updateCourses} = require('../dao/coursesDao');

class Courses {
    constructor(p) {
        if (p) {
            if (p.id) this.id = p.id;
            if (p.titolo) this.titolo = p.titolo;
            if (p.specializzazione) this.specializzazione = p.specializzazione;
            if (p.durata) this.durata = p.durata;
            if (p.capitoli) this.capitoli = p.capitoli;
            if (p.isdeleted) this.isdeleted = p.isdeleted;

            if (p.idProf) this.idProf = p.idProf;

        }
    }


    static async lista () {
        let listaCorsiDAO = await listCourses();
        let res = [];
        listaCorsiDAO.forEach(e => {
            res.push(new Courses(e));
        });
        return res;
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
        let pf = await getCoursesById(id);
        if (pf) { return pf; }
        return null;
    }

    // static async exists(id) {
    //     return await utenteExistById(id);
    // }

    // static async find(id) {
    //     return await utenteExistById(id);
    // }

    static async delete(id) {
        return await deleteCourses(id);
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
    getIdProf() {
        return this.idProf;
    }

    setIdProf(x) {
        if (x == null || typeof (x) == 'undefined') throw 'IDProf cannot be null';
        this.idProf = x;
    }
    getIsDeleted() {
        return this.isdeleted;
    }

    setIsDeleted(x) {
        if (x == null || typeof (x) == 'undefined') throw 'IsDeleted cannot be null';
        this.isdeleted = x;
    }

    // existId() {
    //     if (this.id == null || typeof (this.id) == 'undefined') return false;
    //     return true;
    // }
    setTitolo(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Titolo cannot be null';
        this.titolo = x;
    }
    getTitolo() {
        return this.titolo;
    }

    setSpecializzazione(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Specializzazione cannot be null';
        this.specializzazione = x;
    }
    getSpecializzazione() {
        return this.Specializzazione;
    }

    setDurata(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Durata cannot be null';
        this.durata = x;
    }
    getDurata() {
        return this.durata;
    }
    setCapitoli(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Capitoli cannot be null';
        this.capitoli = x;
    }
    getCapitoli() {
        return this.capitoli;
    }

    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null) {
            let res = await updateCourses(this.id, this.titolo, this.specializzazione, this.durata, this.capitoli, this.idProf, this.isdeleted
            );
            if (!res) {
                throw 'save Courses failed (update case).';
            }
        } else {
            let res = await insertCourses(this.titolo, this.specializzazione, this.durata, this.capitoli, this.idProf, this.isdeleted
            );
            this.setId(res);
            if (!res) throw 'save Courses failed (insert case).';
        }
    }
}

module.exports = Courses;