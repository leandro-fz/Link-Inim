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


    static async lista () {
        let listaPostDAO = await listPost();
        let res = [];
        listaPostDAO.forEach(e => {
            res.push(new Post(e));
        });
        return res;
    }



    static async get(Id) {
        let pf = await getPostById(Id);
        if (pf) { return new Post(pf); }
        return null;
    }


    static async delete(Id) {
        return await deletePost(Id);
    }

    
    getId() {
        return this.Id;
    }

    setId(x) {
        if (x == null || typeof (x) == 'undefined') throw 'ID cannot be null';
        this.Id = x;
    }

    
    setTesto(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Testo cannot be null';
        this.Testo = x;
    }
    getTesto() {
        return this.Testo;
    }

    setDatetime(x) {
        if (x == null || typeof (x) == 'undefined') throw 'Datetime cannot be null';
        this.Datetime = x;
    }
    getDatetime() {
        return this.Datetime;
    }

    setIdUtente(x) {
        if (x == null || typeof (x) == 'undefined') throw 'IdUtente cannot be null';
        this.IdUtente = x;
    }
    getIdUtente() {
        return this.IdUtente;
    }
  
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