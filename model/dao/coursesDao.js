const { getConnection } = require("../../db/connection")

const listCourses = async () => {
    const conn = await getConnection();
    // console.log('trying operatore');
    const query = "SELECT * FROM Corsi";
    const [rows] = await conn.query(query);
    return rows;
}

const getCoursesById = async (id) => {
    const conn = await getConnection();
    const query = `SELECT * FROM Corsi WHERE Id = ?`;
    const [rows] = await conn.query(query, [id]);
    return rows[0];
  }

const insertCourses = async (titolo, specializzazione, durata, capitoli, idProf, isdeleted) => {
    const conn = await getConnection();
    const query = 'INSERT INTO Corsi (Titolo, Specializzazione, Durata, Capitoli, IdProf, IsDeleted) VALUES (?, ?, ?, ?, ?, ?)';
    const [res] = await conn.query(query, [titolo, specializzazione, durata, capitoli, idProf, isdeleted]);
    return res.insertId;
}

const updateCourses = async (titolo, specializzazione, durata, capitoli, idProf, isdeleted) => {
    const conn = await getConnection();
    const query = 'UPDATE Corsi SET Titolo = ?, Specializzazione = ?, Durata = ?, Capitoli = ?, IdProf = ?, IsDeleted = ? WHERE Id = ?';
    const [res] = await conn.query(query, [titolo, specializzazione, durata, capitoli, idProf, isdeleted]);
    // console.log(res);
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