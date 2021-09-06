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
class Project_techno {
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
    static async findByProject(projectID) {
        try {
            const {rows} = await db.query(`
                SELECT project_id, techno.id AS "techno_id", techno.image AS "techno_image"
                FROM project_techno 
                JOIN techno ON project_techno.techno_id = techno.id
                WHERE project_id=$1
                `, [projectID]);
            return rows.map(row => new Project_techno(row));
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    static async findByTechno(technoID) {
        try {
            const {rows} = await db.query(`SELECT * FROM project_techno WHERE techno_id=$1`, [technoID]);
            return rows.map(row => new Project_techno(row));
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    async save() {
        try {
            const {rows} = await db.query('SELECT new_project_techno($1)', [this]);
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

    static async delete(project_id, techno_id) {
        try {
            await db.query(`DELETE FROM "project_techno" WHERE project_id=$1 AND techno_id=$2`, [project_id, techno_id]);
        } catch(error) {
            if(error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }
}

module.exports = Project_techno;