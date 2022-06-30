const { getConnection } = require("../../db/connection")

// restituisce la lista di tutte le specializzazioni
const listaNomiSpecializzazioni = async () => {
    const connection = await getConnection();
    const query = `SELECT * FROM Specializzazioni`;
    const [rows] = await connection.query(query);
    return rows;
}

// prende una specializzazione in base all'id passato
const getSpecializzazioniById = async (Id) => {
    const conn = await getConnection();
    const query = `SELECT * FROM Specializzazioni WHERE Id = ?`;
    const [rows] = await conn.query(query, [Id]);
    logger.debug('Query Singolo post Result:', rows[0]);
    return rows[0];
  }

// restituisce la lista delle persone disponibili
const listaPersoneDisponibili =  async (idSpecializzazione) => {
    const connection = await getConnection();
    const query = `SELECT Id, Nome, Cognome, Email FROM 
    (SELECT UT.Id, Nome, Cognome, Email, Matching FROM utenti as UT LEFT JOIN utentispecializzazioni as US on UT.Id = US.IdUtente
    WHERE US.IdSpecializzazione = ? ) as users WHERE users.matching >= 1`;
    const [rows] = await connection.query(query, [idSpecializzazione]);
    return rows;
}


module.exports = {
    listaNomiSpecializzazioni,
    getSpecializzazioniById,
    listaPersoneDisponibili
}