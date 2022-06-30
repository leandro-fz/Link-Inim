const { getConnection } = require("../../db/connection")

const listCommentiPost = async (id_post) => {
    const conn = await getConnection();
    // console.log('trying operatore');
    const query = "SELECT * FROM CommentiPost WHERE IdPost = ?";
    const [rows] = await conn.query(query, [id_post]);
    return rows;
}

const getCommentById = async (Id) => {
    const conn = await getConnection();
    const query = `SELECT * FROM CommentiPost WHERE Id = ?`;
    const [rows] = await conn.query(query, [Id]);
    return rows[0];
  }

const insertComments = async (Testo, Datetime, IdUtente, IdPost, IdCommento) => {
    const conn = await getConnection();
    const query = 'INSERT INTO CommentiPost (Testo, Datetime, IdUtente, IdPost, IdCommento) VALUES (?, ?, ?, ?, ?)';
    const [res] = await conn.query(query, [Testo, Datetime, IdUtente, IdPost, IdCommento]);
    return res.insertId;
}

const updateComments = async (Id, Testo, Datetime, IdUtente, IdPost, IdCommento) => {
    const conn = await getConnection();
    const query = 'UPDATE CommentiPost SET Testo = ?, Datetime = ?, IdUtente = ?, IdPost = ?, IdCommento = ? WHERE Id = ?';
    const [res] = await conn.query(query, [Testo, Datetime, IdUtente, IdPost, IdCommento]);
    // console.log(res);
    return res.affectedRows === 1;
}

const deleteComment = async (Id) => {
    const conn = await getConnection();
    const query = 'DELETE FROM CommentiPost WHERE Id = ?';
    const [res] = await conn.query(query, [Id]);
    return res.affectedRows === 1;
  }

module.exports = {
    listCommentiPost,
    getCommentById,
    updateComments,
    insertComments,
    deleteComment
}