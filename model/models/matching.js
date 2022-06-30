
class Matching {
    static async listaNomi () {
        let listaNomiSpectDAO = await listaNomiSpecializzazioni();
        let res = [];
        listaNomiSpectDAO.forEach(e => {
            res.push(e);
        });
        return res;
    }
}

module.exports = Matching;