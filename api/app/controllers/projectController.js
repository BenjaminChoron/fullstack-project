const { json } = require('express');
const Project = require('../models/Project');

const projectController = {
    findAll: async (_, response) => {
        try {
            const projects = await Project.findAll();
            response.json(projects);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    findOne: async (request, response) => {
        try {
            const project = await Project.findOne(parseInt(request.params.id, 10));
            response.json(project);
        } catch(error) {
            if (error instanceof Project.NoProjectError) {
                response.status(404).send(error.message);
            } else {
                response.status(500).send(error.message);
            }
        }
    },

    findByTitle: async (request, response) => {
        try {
            const project = await Project.findByTitle(request.params.title);
            response.json(project);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    save: async (request, response) => {
        try {
            const project = new Project(request.body);
            const newProject = await project.save();
            if (newProject) {
                //on a une valeur de retour, il s'agit d'un INSERT
                response.status(201).json(newProject);
            } else {
                //pas de valeur de retour, c'était un UPDATE
                response.status(204).json('Update done');
            }
        } catch (error) {
            response.status(500).send(error.message);
        }
    },

    delete: async (request, response) => {
        try {
            const projectID = parseInt(request.params.id, 10);
            await Project.delete(projectID);
            response.status(200).json(`Project with id ${projectID} deleted`);
        } catch(error) {
            response.status(500).send(error.message);
        }
    }

};

module.exports = projectController;