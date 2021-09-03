const db = require('../database');

class NoUserError extends Error {
    constructor(id) {
        super(`No user with id ${id}`);
    }
}

/**
 * @typedef User
* @property {number} id
* @property {string} first_name
* @property {string} last_name
* @property {string} email
* @property {string} password
* @property {number} avatar_id
*/
class User {
    static NoUserError = NoUserError;

    constructor(obj={}) {
        for(const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Retrieves all users from database
     * @static
     * @async
     * @returns {Array<User>} all users in database
     * @throws {Error} There's a problem with the request
     */
    static async findAll() {
        try {
            const {rows} = await db.query(`SELECT "user".id, first_name, last_name, email, password, github, linkedin, twitter, avatar_id, avatar.url AS "avatar" FROM "user" JOIN avatar ON "user".avatar_id = avatar.id`);
            return rows.map(row => new User(row));
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Retrieves an user from database
     * @static
     * @async
     * @param {number} id 
     * @returns {User} the instance identified with its id
     * @throws {Error} There's a problem with the request
     * @throws {NoUserError} given id doesn't match with any record in database
     */  
    static async findOne(id) {
        try {
            const {rows} = await db.query(`SELECT "user".id, first_name, last_name, email, password, github, linkedin, twitter, avatar_id, avatar.url AS "avatar" FROM "user" JOIN avatar ON "user".avatar_id = avatar.id WHERE "user".id=$1`, [id]);
            if(rows[0]) {
                return new User(rows[0]);
            }
            throw new NoUserError(id);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Adds or updates an instance of User in database
     * @async
     * @returns {User} the inserted or updated instance
     * @throws {Error} There's a problem with the request
     */
    async save() {
        try {
            if (this.id) {
                await db.query('SELECT update_user($1)', [this]);
            } else {
                const {rows} = await db.query('SELECT new_user($1) AS id', [this]);
                this.id = rows[0].id;
                return this;
            }
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
            await db.query(`DELETE FROM "user" WHERE id=$1`, [id]);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }
};

module.exports = User;