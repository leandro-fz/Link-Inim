const { getConnection } = require("../../db/connection")


const listaNomiSpecializzazioni = async () => {
    const connection = await getConnection();
    const query = `SELECT * FROM Specializzazioni`;
    const [rows] = await connection.query(query);
    return rows;
}


module.exports = {
    listaNomiSpecializzazioni
}