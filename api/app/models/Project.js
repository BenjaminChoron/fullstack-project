const db = require('../database');

class NoProjectError extends Error {
    constructor(id) {
        super(`No project with id ${id}`);
    }
}

/**
 * @typedef Project
* @property {number} id
* @property {string} title
* @property {string} content
* @property {string} github_link
* @property {string} web_link
* @property {number} user_id
* @property {number} image_id
*/
class Project {
    static NoProjectError = NoProjectError;

    constructor(obj={}) {
        for(const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Retrieves all projects from database
     * @static
     * @async
     * @returns {Array<Project>} all projects in database
     * @throws {Error} There's a problem with the request
     */
    static async findAll() {
        try {
            const {rows} = await db.query(`SELECT title, content, github_link, web_link, image.url AS "image" FROM "project" JOIN image ON post.image_id = image.id`);
            return rows.map(row => new Project(row));
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Retrieves an project from database
     * @static
     * @async
     * @param {number} id 
     * @returns {Project} the instance identified with its id
     * @throws {Error} There's a problem with the request
     * @throws {NoProjectError} given id doesn't match with any record in database
     */  
    static async findOne(id) {
        try {
            const {rows} = await db.query(`SELECT title, content, github_link, web_link, image.url AS "image" FROM "project" JOIN image ON post.image_id = image.id WHERE id=$1`, [id]);
            if(rows[0]) {
                return new Project(rows[0]);
            }
            throw new NoProjectError(id);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    /**
     * Adds or updates an instance of Project in database
     * @async
     * @returns {Project} the inserted or updated instance
     * @throws {Error} There's a problem with the request
     */
    async save() {
        try {
            if (this.id) {
                await db.query('SELECT update_project($1)', [this]);
            } else {
                const {rows} = await db.query('SELECT new_project($1) AS id', [this]);
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
            await db.query(`DELETE FROM "project" WHERE id=$1`, [id]);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }
};

module.exports = Project;