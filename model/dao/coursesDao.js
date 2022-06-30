const { getConnection } = require("../../db/connection")
const { logger } = require('../../common/logging')

const listCourses = async () => {
    const conn = await getConnection();
    const query = "SELECT * FROM Corsi";
    logger.debug('Query Lista Corsi:' + query);
    const [rows] = await conn.query(query);
    logger.debug('Query Lista Corsi Result:', rows);
    return rows;
}

const getCoursesById = async (id) => {
    const conn = await getConnection();
    const query = `SELECT * FROM Corsi WHERE Id = ?`;
    logger.debug('Query Singolo Corso:' + query);

    const [rows] = await conn.query(query, [id]);
    logger.debug('Query Singolo Corso Result:', rows[0]);
    return rows[0];
  }

const insertCourses = async (Titolo, Specializzazione, Durata, Capitoli, IdProf, IsDeleted) => {
    const conn = await getConnection();
    const query = 'INSERT INTO Corsi (Titolo, Specializzazione, Durata, Capitoli, IdProf, IsDeleted) VALUES (?, ?, ?, ?, ?, ?)';
    const [res] = await conn.query(query, [Titolo, Specializzazione, Durata, Capitoli, IdProf, IsDeleted]);
    return res.insertId;
}

const updateCourses = async (Id, Titolo, Specializzazione, Durata, Capitoli, IdProf, IsDeleted ) => {
    const conn = await getConnection();
    const query = 'UPDATE Corsi SET Titolo = ?, Specializzazione = ?, Durata = ?, Capitoli = ?, IdProf = ?, IsDeleted = ? WHERE Id = ?';
    const [res] = await conn.query(query, [Titolo, Specializzazione, Durata, Capitoli, IdProf, IsDeleted, Id]);

    return res.affectedRows === 1;
}

const deleteCourses = async (id) => {
    const conn = await getConnection();
    const query = 'DELETE FROM Corsi WHERE id = ?';
    const [res] = await conn.query(query, [id]);
    return res.affectedRows === 1;
  }

module.exports = {
    listCourses,
    getCoursesById,
    insertCourses,
    updateCourses,
    deleteCourses
}