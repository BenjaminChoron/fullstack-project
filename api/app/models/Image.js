const db = require('../database');

class NoImageError extends Error {
    constructor(id) {
        super(`No image with id ${id}`);
    }
}

/**
 * @typedef Image
* @property {number} id
* @property {string} name
* @property {string} url
*/
class Image {
    static NoImageError = NoImageError;

    constructor(obj={}) {
        for(const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Retrieves all images from database
     * @static
     * @async
     * @returns {Array<Image>} all images in database
     * @throws {Error} There's a problem with the request
     */
    static async findAll() {
        try {
            const {rows} = await db.query(`SELECT * FROM "image"`);
            return rows.map(row => new Image(row));
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Retrieves a image from database
     * @static
     * @async
     * @param {number} id 
     * @returns {Image} the instance identified with its id
     * @throws {Error} There's a problem with the request
     * @throws {NoImageError} given id doesn't match with any record in database
     */  
    static async findOne(id) {
        try {
            const {rows} = await db.query(`SELECT * FROM "image" WHERE id=$1`, [id]);
            if(rows[0]) {
                return new Image(rows[0]);
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
     * Adds or updates an instance of Image in database
     * @async
     * @returns {Image} the inserted or updated instance
     * @throws {Error} There's a problem with the request
     */
    async save() {
        try {
            const {rows} = await db.query('SELECT new_image($1) AS id', [this]);
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
            await db.query(`DELETE FROM "image" WHERE id=$1`, [id]);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }
};

module.exports = Image;