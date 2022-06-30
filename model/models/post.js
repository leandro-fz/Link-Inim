const { listPost, insertPost, getPostById, deletePost, updatePost} = require('../dao/postDao');


class Post {
    constructor(p) {
        if (p) {
            if (p.Id) this.Id = p.Id;
            if (p.Testo) this.Testo = p.Testo;
            if (p.Datetime) this.Datetime = p.Datetime;
            if (p.IdUtente) this.IdUtente = p.IdUtente;
        }
    }

    // restituisce la lista di tutti i post
    static async lista () {
        let listaPostDAO = await listPost();
        let res = [];
        listaPostDAO.forEach(e => {
            res.push(new Post(e));
        });
        return res;
    }

    // restituisce un post in base all'id
    static async get(Id) {
        let pf = await getPostById(Id);
        if (pf) { return new Post(pf); }
        return null;
    }

    // elimina un post in base all'id
    static async delete(Id) {
        return await deletePost(Id);
    }

    // get/set id post
    getId() {
        return this.Id;
    }

    setId(x) {
        if (x == null || typeof (x) == 'undefined') throw 'ID cannot be null';
        this.Id = x;
    }

    // get/set testo post    
    setTesto(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Testo cannot be null';
        this.Testo = x;
    }
    getTesto() {
        return this.Testo;
    }

    // get/set data post
    setDatetime(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Datetime cannot be null';
        this.Datetime = x;
    }
    getDatetime() {
        return this.Datetime;
    }

    // get/set id utente
    setIdUtente(x) {
        if (x == null || typeof (x) == 'undefined') throw 'IdUtente cannot be null';
        this.IdUtente = x;
    }
    getIdUtente() {
        return this.IdUtente;
    }
  
    // crea un nuovo post e modifica un post esistente
    async save() {
        if (typeof (this.Id) != 'undefined' && this.Id != null) {
            let res = await updatePost(this.Id, this.Testo, this.Datetime, this.IdUtente
            );
            if (!res) {
                throw 'save Utente failed (update case).';
            }
        } else {
            let res = await insertPost(this.Testo, this.Datetime, this.IdUtente
            );
            this.setId(res);
            if (!res) throw 'save Post failed (insert case).';
        }
    }
}

module.exports = Post;