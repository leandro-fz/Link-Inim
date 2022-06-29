const { getConnection } = require("../../db/connection")
const { logger } = require('../../common/logging')

const listPost = async () => {
    const conn = await getConnection();
    const query = "SELECT * FROM Post";
    const [rows] = await conn.query(query);
    return rows;
}

const getPostById = async (Id) => {
    const conn = await getConnection();
    const query = `SELECT * FROM Post WHERE Id = ?`;
    const [rows] = await conn.query(query, [Id]);
    logger.debug('Query Singolo post Result:', rows[0]);
    return rows[0];
  }

const insertPost = async (Testo, Datetime, IdUtente) => {
    const conn = await getConnection();
    const query = 'INSERT INTO Post (Testo, Datetime, IdUtente) VALUES (?, ?, ?)';
    const [res] = await conn.query(query, [Testo, Datetime, IdUtente]);
    return res.insertId;
}

const updatePost = async (Id, Testo, Datetime, IdUtente) => {
    const conn = await getConnection();
    const query = 'UPDATE Post SET Testo = ?, Datetime = ?, IdUtente = ? WHERE Id = ?';
    const [res] = await conn.query(query, [Testo, Datetime, IdUtente, Id]);
    return res.affectedRows === 1;
}

const deletePost = async (Id) => {
    const conn = await getConnection();
    const query = 'DELETE FROM Post WHERE Id = ?';
    const [res] = await conn.query(query, [Id]);
    return res.affectedRows === 1;
  }

module.exports = {
    listPost,
    getPostById,
    insertPost,
    updatePost,
    deletePost
}