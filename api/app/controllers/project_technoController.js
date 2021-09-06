const { json } = require('express');
const Project_techno = require('../models/Project_techno');

const project_technoController = {
    findByProject: async (request, response) => {
        try {
            const projects = await Project_techno.findByProject(request.params.id);
            response.json(projects);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    findByTechno: async (request, response) => {
        try {
            const technos = await Project_techno.findByTechno(request.params.id);
            response.json(technos);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    save: async (request, response) => {
        try {
            const project = new Project_techno(request.body);
            const newProjectTechno = await project.save();
            response.status(201).json(newProjectTechno);
        } catch (error) {
            response.status(500).send(error.message);
        }
    },

    delete: async (request, response) => {
        try {
            const projectID = parseInt(request.params.project_id, 10);
            const technoID = parseInt(request.params.techno_id, 10);
            await Project_techno.delete(projectID, technoID);
            response.status(200).json(`Association deleted`);
        } catch(error) {
            response.status(500).send(error.message);
        }
    }
};

module.exports = project_technoController;