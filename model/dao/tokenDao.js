const { getConnection } = require('../../db/connection');
const { randomUUID } = require('crypto');

async function getTokenByUtente(id_utente) {
  const connection = await getConnection();
  let query = 'SELECT Token FROM Token WHERE IdUtente = ?';
  const [rows] = await connection.query(query, [id_utente]);
  if ([rows].lenght < 1) { return null }
  else { return rows[0] }
}

async function persistToken(token, IdUtente, exp = 1000 * 60 * 60 * 24, remind_me = 0) {
  const conn = await getConnection();
  const date = new Date();
  const expno = date.getTime() + exp;
  await conn.query('INSERT INTO Token (Token, IdUtente, Scadenza, RemindMe) VALUES (?, ?, ?, ?)', [token, IdUtente, expno, remind_me]);
}

async function generatorToken(id_utente) {
  try {
    const random = randomUUID();
    await persistToken(random, id_utente);
    return random
  } catch (error) {
    console.log(error);
  }
}

async function validateToken(token) {
  const conn = await getConnection();
  const [rows] = await conn.query('SELECT * FROM Token WHERE Token = ?', [token]);
  const row = rows[0];
  if (!row) {
    return false;
  }
  const now = (new Date).getTime()
  if (now > row.Scadenza) {
    return false;
  }
  return row.IdUtente;
}

async function deleteToken(token) {
  const connection = await getConnection();
  let query = 'DELETE FROM Token WHERE Token = ?';
  const [res] = await connection.query(query, [token]);
  return res.affectedRows === 1;
}


async function forcedExpirationToken(IdUtente, token, Scadenza = 0, RemindMe = 0) {
  const connection = await getConnection();
  let query = `UPDATE Token SET IdUtente = ?, Scadenza = ?, RemindMe = ? WHERE Token = ?`;
  const [res] = await connection.query(query, [IdUtente, Scadenza, RemindMe, token]);
  return res.affectedRows === 1;
}

module.exports = {
  persistToken,
  validateToken,
  getTokenByUtente,
  generatorToken,
  deleteToken,
  forcedExpirationToken
}