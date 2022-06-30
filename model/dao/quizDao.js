const { getConnection } = require("../../db/connection")

const listQuiz = async (id_corso) => {
    const conn = await getConnection();
    const query = "SELECT * FROM Quiz WHERE IdCorso = ?";
    const [rows] = await conn.query(query, [id_corso]);
    return rows;
}

const getQuizById = async (Id) => {
    const conn = await getConnection();
    const query = `SELECT * FROM Quiz WHERE Id = ?`;
    const [rows] = await conn.query(query, [Id]);
    return rows[0];
  }

const insertQuiz = async (IdCorso, Domanda, RispostaCorretta, RispostaErrata1, RispostaErrata2, RispostaErrata3) => {
    const conn = await getConnection();
    const query = 'INSERT INTO Quiz (IdCorso, Domanda, RispostaCorretta, RispostaErrata1, RispostaErrata2, RispostaErrata3) VALUES (?, ?, ?, ?, ?, ?)';
    const [res] = await conn.query(query, [IdCorso, Domanda, RispostaCorretta, RispostaErrata1, RispostaErrata2, RispostaErrata3]);
    return res.insertId;
}

const updateQuiz = async (Id, IdCorso, Domanda, RispostaCorretta, RispostaErrata1, RispostaErrata2, RispostaErrata3) => {
    const conn = await getConnection();
    const query = 'UPDATE Quiz SET IdCorso = ?, Domanda = ?, RispostaCorretta = ?, RispostaErrata1 = ?, RispostaErrata2 = ?, RispostaErrata3 = ? WHERE Id = ?';
    const [res] = await conn.query(query, [IdCorso, Domanda, RispostaCorretta, RispostaErrata1, RispostaErrata2, RispostaErrata3, Id]);
    return res.affectedRows === 1;
}

const deleteQuiz = async (Id) => {
    const conn = await getConnection();
    const query = 'DELETE FROM Quiz WHERE Id = ?';
    const [res] = await conn.query(query, [Id]);
    return res.affectedRows === 1;
  }

module.exports = {
    listQuiz,
    getQuizById,
    updateQuiz,
    insertQuiz,
    deleteQuiz
}