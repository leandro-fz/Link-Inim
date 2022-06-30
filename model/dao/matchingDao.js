const { getConnection } = require("../../db/connection")


const listaNomiSpecializzazioni = async () => {
    const connection = await getConnection();
    const query = `SELECT * FROM Specializzazioni`;
    const [rows] = await connection.query(query);
    return rows;
}

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
    listaPersoneDisponibili
}