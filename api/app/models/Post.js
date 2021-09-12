const db = require('../database');

class NoPostError extends Error {
    constructor(id) {
        super(`No post with id ${id}`);
    }
}

/**
 * @typedef Post
* @property {number} id
* @property {string} title
* @property {string} subtitle
* @property {string} content
* @property {number} user_id
* @property {number} image_id
*/
class Post {
    static NoPostError = NoPostError;

    constructor(obj={}) {
        for(const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Retrieves all posts from database
     * @static
     * @async
     * @returns {Array<Post>} all posts in database
     * @throws {Error} There's a problem with the request
     */
    static async findAll() {
        try {
            const {rows} = await db.query(`SELECT post.id, title, subtitle, content, image.id AS "id_image", image.url AS "image" FROM "post" JOIN image ON post.image_id = image.id`);
            return rows.map(row => new Post(row));
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Retrieves all drafts from database
     * @static
     * @async
     * @returns {Array<Post>} all drafts in database
     * @throws {Error} There's a problem with the request
     */
    static async findAllDrafts() {
        try {
            const {rows} = await db.query(`SELECT draft_post.id, title, subtitle, content, image.id AS "id_image", image.url AS "image" FROM "draft_post" JOIN image ON draft_post.image_id = image.id`);
            return rows.map(row => new Post(row));
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Retrieves a post from database
     * @static
     * @async
     * @param {number} id 
     * @returns {Post} the instance identified with its id
     * @throws {Error} There's a problem with the request
     * @throws {NoPostError} given id doesn't match with any record in database
     */  
    static async findOne(id) {
        try {
            const {rows} = await db.query(`SELECT post.id, title, subtitle, content, image.id AS "id_image", image.url AS "image" FROM "post" JOIN image ON post.image_id = image.id WHERE post.id=$1`, [id]);
            if(rows[0]) {
                return new Post(rows[0]);
            }
            throw new NoPostError(id);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Retrieves a draft from database
     * @static
     * @async
     * @param {number} id 
     * @returns {Post} the instance identified with its id
     * @throws {Error} There's a problem with the request
     * @throws {NoPostError} given id doesn't match with any record in database
     */ 
    static async findOneDraft(id) {
        try {
            const {rows} = await db.query(`SELECT draft_post.id, title, subtitle, content, image.id AS "id_image", image.url AS "image" FROM "draft_post" JOIN image ON draft_post.image_id = image.id WHERE draft_post.id=$1`, [id]);
            if(rows[0]) {
                return new Post(rows[0]);
            }
            throw new NoPostError(id);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Adds or updates an instance of Post in database
     * @async
     * @returns {Post} the inserted or updated instance
     * @throws {Error} There's a problem with the request
     */
    async save() {
        try {
            if (this.id) {
                await db.query('SELECT update_post($1)', [this]);
            } else {
                const {rows} = await db.query('SELECT new_post($1) AS id', [this]);
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

    /**
     * Adds or updates an instance of Post in draft_post table
     * @async
     * @returns {Post} the inserted or updated instance
     * @throws {Error} There's a problem with the request
     */
    async saveDraft() {
        try {
            if (this.id) {
                await db.query('SELECT update_draft($1)', [this]);
            } else {
                const {rows} = await db.query('SELECT new_draft($1) AS id', [this]);
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

    /**
     * Erases a post from database
     * @static
     * @async
     * @param {number} id 
     * @throws {Error} There's a problem with the request
     */ 
    static async delete(id) {
        try {
            await db.query(`DELETE FROM "post" WHERE id=$1`, [id]);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Erases a draft from database
     * @static
     * @async
     * @param {number} id 
     * @throws {Error} There's a problem with the request
     */ 
    static async deleteDraft(id) {
        try {
            await db.query(`DELETE FROM "draft_post" WHERE id=$1`, [id]);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }
};

module.exports = Post;