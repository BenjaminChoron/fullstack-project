const db = require('../database');

class NoTechnoError extends Error {
    constructor(id) {
        super(`No techno with id ${id}`);
    }
}

/**
 * @typedef Techno
* @property {number} id
* @property {string} name
* @property {string} image
*/
class Techno {
    static NoTechnoError = NoTechnoError;

    constructor(obj={}) {
        for(const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Retrieves all technos from database
     * @static
     * @async
     * @returns {Array<Techno>} all technos in database
     * @throws {Error} There's a problem with the request
     */
    static async findAll() {
        try {
            const {rows} = await db.query(`SELECT * FROM "techno"`);
            return rows.map(row => new Techno(row));
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Retrieves a techno from database
     * @static
     * @async
     * @param {number} id 
     * @returns {Techno} the instance identified with its id
     * @throws {Error} There's a problem with the request
     * @throws {NoImageError} given id doesn't match with any record in database
     */  
    static async findOne(id) {
        try {
            const {rows} = await db.query(`SELECT * FROM "techno" WHERE id=$1`, [id]);
            if(rows[0]) {
                return new Techno(rows[0]);
            }
            throw new NoTechnoError(id);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Adds or updates an instance of Techno in database
     * @async
     * @returns {Techno} the inserted or updated instance
     * @throws {Error} There's a problem with the request
     */
    async save() {
        try {
            const {rows} = await db.query('SELECT new_techno($1) AS id', [this]);
            this.id = rows[0].id;
            return this;
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    static async delete(id) {
        try {
            await db.query(`DELETE FROM "techno" WHERE id=$1`, [id]);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }
};

module.exports = Techno;