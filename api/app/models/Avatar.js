const db = require('../database');

class NoAvatarError extends Error {
    constructor(id) {
        super(`No avatar with id ${id}`);
    }
}

/**
 * @typedef Avatar
* @property {number} id
* @property {string} name
* @property {string} url
*/
class Avatar {
    static NoAvatarError = NoAvatarError;

    constructor(obj={}) {
        for(const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Retrieves all avatars from database
     * @static
     * @async
     * @returns {Array<Avatar>} all avatars in database
     * @throws {Error} There's a problem with the request
     */
    static async findAll() {
        try {
            const {rows} = await db.query(`SELECT * FROM "avatar"`);
            return rows.map(row => new Avatar(row));
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Retrieves a avatar from database
     * @static
     * @async
     * @param {number} id 
     * @returns {Avatar} the instance identified with its id
     * @throws {Error} There's a problem with the request
     * @throws {NoAvatarError} given id doesn't match with any record in database
     */  
    static async findOne(id) {
        try {
            const {rows} = await db.query(`SELECT * FROM "avatar" WHERE id=$1`, [id]);
            if(rows[0]) {
                return new Avatar(rows[0]);
            }
            throw new NoAvatarError(id);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Adds or updates an instance of Avatar in database
     * @async
     * @returns {Avatar} the inserted or updated instance
     * @throws {Error} There's a problem with the request
     */
    async save() {
        try {
            const {rows} = await db.query('SELECT new_avatar($1) AS id', [this]);
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
            await db.query(`DELETE FROM "avatar" WHERE id=$1`, [id]);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }
};

module.exports = Avatar;