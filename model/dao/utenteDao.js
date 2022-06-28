const { getConnection } = require('../../db/connection');

async function getUtenteByEmailDAO(email) {
  const conn = await getConnection();
  const [utenti] = await conn.query('SELECT * FROM Utenti WHERE Email = ?', [email]);
  return utenti[0];
}

async function utenteDeleteById(id_utente) {
  const connection = await getConnection();
  const query = 'DELETE FROM Utenti WHERE Id = ?';
  const [res] = await connection.query(query, [id_utente]);
  return res.affectedRows === 1;
}



async function listaUtenti() {
  const connection = await getConnection();
  const [rows] = await connection.query('SELECT * FROM Utenti')
  return rows;
}

const sedeDeleteById = async (id_utente) => {
  const connection = await getConnection();
  const query = 'DELETE FROM Utenti WHERE Id = ?';
  const [res] = await connection.query(query, [id_utente]);
  return res.affectedRows === 1;
}


const getUtenteById = async (id_utente) => {
  const connection = await getConnection();
  const query = 'SELECT * FROM Utenti WHERE Id = ?';
  const [rows] = await connection.query(query, [id_utente]);
  return rows[0];
}

const insertUtente = async (Nome, Cognome, CodFiscale, Email, Password, DataDiNascita, Matching, ProfEsterno, Iban, ImmagineUrl, DataAssunzione, IsAdmin) => {
  const connection = await getConnection();
  const query = `INSERT INTO Utenti (Nome, Cognome, CodFisc, Email, Password, DataDiNascita, Matching, ProfEsterno, Iban, ImmagineUrl, DataAssunzione, IsAdmin)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
  const [res] = await connection.query(query, [Nome, Cognome, CodFiscale, Email, Password, DataDiNascita, Matching, ProfEsterno, Iban, ImmagineUrl, DataAssunzione, IsAdmin]);
  return res.insertId;
}

module.exports = {
  getUtenteById,
  insertUtente,
  getUtenteByEmailDAO,
  listaUtenti,
  sedeDeleteById,
  utenteDeleteById
}