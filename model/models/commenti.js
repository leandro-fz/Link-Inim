const { listComments, insertComments, getCommentById, deleteComment, updateComments} = require('../dao/commentsDao');

class Comments {
    constructor(p) {
        if (p) {
            if (p.Id) this.Id = p.Id;
            if (p.Testo) this.Testo = p.Testo;
            if (p.Datetime) this.Datetime = p.Datetime;

            if (p.IdUtente) this.IdUtente = p.IdUtente;
            if (p.IdCorso) this.IdCorso = p.IdCorso;
        }
    }


    static async lista () {
        let listaCommentiDAO = await listComments();
        let res = [];
        listaCommentiDAO.forEach(e => {
            res.push(new Comments(e));
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

    static async get(Id) {
        let pf = await getCommentById(Id);
        if (pf) { return new Comments(pf); }
        return null;
    }

    // static async exists(Id) {
    //     return await utenteExistById(Id);
    // }

    // static async find(Id) {
    //     return await utenteExistById(Id);
    // }

    static async delete(Id) {
        return await deleteComment(Id);
    }

    // setId(x) {
    //     if (x == null || typeof (x) == 'undefined') throw 'Nome cannot be null';
    //     this.Id = x;
    // }
    getId() {
        return this.Id;
    }

    setId(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Id cannot be null';
        this.Id = x;
    }
    getTesto() {
        return this.Testo;
    }

    setTesto(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Text field cannot be null';
        this.Testo = x;
    }
    getDatetime() {
        return this.Datetime;
    }

    setDatetime(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Datetime cannot be null';
        this.Datetime = x;
    }

    // existId() {
    //     if (this.Id == null || typeof (this.Id) == 'undefined') return false;
    //     return true;
    // }

    setIdUtente(x) {
        if (x == null || typeof (x) == 'undefined') throw 'IdUtente cannot be null';
        this.IdUtente = x;
    }
    getIdUtente() {
        return this.IdUtente;
    }

    setIdCorso(x) {
        if (x == null || typeof (x) == 'undefined') throw 'IdCorso cannot be null';
        this.IdCorso = x;
    }
    getIdCorso() {
        return this.IdCorso;
    }

    async save() {
        if (typeof (this.Id) != 'undefined' && this.Id != null) {
            let res = await updateComments(this.Id, this.Testo, this.Datetime, this.IdUtente, this.IdCorso
            );
            if (!res) {
                throw 'save Comments failed (update case).';
            }
        } else {
            let res = await insertComments(this.Testo, this.Datetime, this.IdUtente, this.IdCorso
            );
            this.setId(res);
            if (!res) throw 'save Comments failed (insert case).';
        }
    }
}

module.exports = Comments;