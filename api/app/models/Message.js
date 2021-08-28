const db = require('../database');

class NoMessageError extends Error {
    constructor(id) {
        super(`No message with id ${id}`);
    }
}

/**
 * @typedef Message
* @property {number} id
* @property {string} from
* @property {string} email
* @property {string} content
*/
class Message {
    static NoMessageError = NoMessageError;

    constructor(obj={}) {
        for(const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Retrieves all messages from database
     * @static
     * @async
     * @returns {Array<Message>} all messages in database
     * @throws {Error} There's a problem with the request
     */
    static async findAll() {
        try {
            const {rows} = await db.query(`SELECT * FROM "message"`);
            return rows.map(row => new Message(row));
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Retrieves a message from database
     * @static
     * @async
     * @param {number} id 
     * @returns {Message} the instance identified with its id
     * @throws {Error} There's a problem with the request
     * @throws {NoMessageError} given id doesn't match with any record in database
     */  
    static async findOne(id) {
        try {
            const {rows} = await db.query(`SELECT * FROM "message" WHERE id=$1`, [id]);
            if(rows[0]) {
                return new Message(rows[0]);
            }
            throw new NoMessageError(id);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Adds or updates an instance of Message in database
     * @async
     * @returns {Message} the inserted or updated instance
     * @throws {Error} There's a problem with the request
     */
    async save() {
        try {
            const {rows} = await db.query('SELECT new_message($1) AS id', [this]);
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
            await db.query(`DELETE FROM "message" WHERE id=$1`, [id]);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }
};

module.exports = Message;