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
            const {rows} = await db.query(`
                SELECT project.id, title, content, github_link, web_link, image.id AS "id_image", image.url AS "image", ARRAY_AGG (techno.image) "techno"
                FROM project
                JOIN image ON project.image_id = image.id 
                JOIN project_techno ON project.id = project_techno.project_id
                JOIN techno ON project_techno.techno_id = techno.id
                GROUP BY project.id, title, content, github_link, web_link, image.url, image.id
            `);
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
            const {rows} = await db.query(`
                SELECT project.id, title, content, github_link, web_link, image.id AS "id_image", image.url AS "image", ARRAY_AGG (techno.image) "techno"
                FROM project
                JOIN image ON project.image_id = image.id 
                JOIN project_techno ON project.id = project_techno.project_id
                JOIN techno ON project_techno.techno_id = techno.id
                WHERE project.id=$1
                GROUP BY project.id, title, content, github_link, web_link, image.url, image.id
            `, [id]);
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

    static async findByTitle(title) {
        try {
            const {rows} = await db.query(`
                SELECT project.id, title, content, github_link, web_link, image.id AS "id_image", image.url AS "image"
                FROM project
                JOIN image ON project.image_id = image.id 
                WHERE title=$1
                GROUP BY project.id, title, content, github_link, web_link, image.url, image.id
            `, [title]);
            return new Project(rows[0]);
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