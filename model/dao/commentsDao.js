const { getConnection } = require("../../db/connection")

const listComments = async () => {
    const conn = await getConnection();
    // console.log('trying operatore');
    const query = "SELECT * FROM CommentiCorsi";
    const [rows] = await conn.query(query);
    return rows;
}

const getCommentById = async (Id) => {
    const conn = await getConnection();
    const query = `SELECT * FROM CommentiCorsi WHERE Id = ?`;
    const [rows] = await conn.query(query, [Id]);
    return rows[0];
  }

const insertComments = async (Testo, Datetime, IdUtente, IdCorso) => {
    const conn = await getConnection();
    const query = 'INSERT INTO CommentiCorsi (Testo, Datetime, IdUtente, IdCorso) VALUES (?, ?, ?, ?)';
    const [res] = await conn.query(query, [Testo, Datetime, IdUtente, IdCorso]);
    return res.insertId;
}

const updateComments = async (Id, Testo, Datetime, IdUtente, IdCorso) => {
    const conn = await getConnection();
    const query = 'UPDATE CommentiCorsi SET Testo = ?, Datetime = ?, IdUtente = ?, IdCorso = ? WHERE Id = ?';
    const [res] = await conn.query(query, [Testo, Datetime, IdUtente, IdCorso, Id]);
    // console.log(res);
    return res.affectedRows === 1;
}

const deleteComment = async (Id) => {
    const conn = await getConnection();
    const query = 'DELETE FROM CommentiCorsi WHERE Id = ?';
    const [res] = await conn.query(query, [Id]);
    return res.affectedRows === 1;
  }

module.exports = {
    listComments,
    getCommentById,
    updateComments,
    insertComments,
    deleteComment
}