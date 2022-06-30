const { listCommentiPost, insertComments, getCommentById, deleteComment, updateComments } = require('../dao/commentiPostDao');

class CommentiPost {
    constructor(p) {
        if (p) {
            if (p.Id) this.Id = p.Id;
            if (p.Testo) this.Testo = p.Testo;
            if (p.Datetime) this.Datetime = p.Datetime;

            if (p.IdUtente) this.IdUtente = p.IdUtente;
            if (p.IdPost) this.IdPost = p.IdPost;
            if (p.IdCommento) this.IdCommento = p.IdCommento;
        }
    }


    // restituisce la lista di tutti i commenti al post
    static async lista () {
        let listaCommentiDAO = await listCommentiPost();
        let res = [];
        listaCommentiDAO.forEach(e => {
            res.push(new CommentiPost(e));
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

    // restituisce un commento specifico
    static async get(Id) {
        let pf = await getCommentById(Id);
        if (pf) { return new CommentiPost(pf); }
        return null;
    }

    // static async exists(Id) {
    //     return await utenteExistById(Id);
    // }

    // static async find(Id) {
    //     return await utenteExistById(Id);
    // }

    // elimina il commento
    static async delete(Id) {
        return await deleteComment(Id);
    }

    // setId(x) {
    //     if (x == null || typeof (x) == 'undefined') throw 'Nome cannot be null';
    //     this.Id = x;
    // }

    // get/set id commento
    getId() {
        return this.Id;
    }

    setId(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Id cannot be null';
        this.Id = x;
    }

    // get/set testo commento
    getTesto() {
        return this.Testo;
    }

    setTesto(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Text field cannot be null';
        this.Testo = x;
    }

    // get/set data commento
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

    // get/set id utente
    setIdUtente(x) {
        if (x == null || typeof (x) == 'undefined') throw 'IdUtente cannot be null';
        this.IdUtente = x;
    }
    getIdUtente() {
        return this.IdUtente;
    }

    // get/set id post
    setIdPost(x) {
        if (x == null || typeof (x) == 'undefined') throw 'IdPost cannot be null';
        this.IdPost = x;
    }
    getIdPost() {
        return this.IdPost;
    }

    // get/set id commento
    setIdCommento(x) {
        if (x == null || typeof (x) == 'undefined') throw 'IdPost cannot be null';
        this.IdCommento = x;
    }
    getIdCommento() {
        return this.IdCommento;
    }

    // insert nuovo commento e update commento
    async save() {
        if (typeof (this.Id) != 'undefined' && this.Id != null) {
            let res = await updateComments(this.Id, this.Testo, this.Datetime, this.IdUtente, this.IdPost, this.IdCommento
            );
            if (!res) {
                throw 'save Comments failed (update case).';
            }
        } else {
            let res = await insertComments(this.Testo, this.Datetime, this.IdUtente, this.IdPost, this.IdCommento
            );
            this.setId(res);
            if (!res) throw 'save Comments failed (insert case).';
        }
    }
}

module.exports = CommentiPost;