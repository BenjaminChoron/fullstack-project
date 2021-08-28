const { json } = require('express');
const Techno = require('../models/Techno');

const technoController = {
    findAll: async (_, response) => {
        try {
            const technos = await Techno.findAll();
            response.json(technos);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    findOne: async (request, response) => {
        try {
            const techno = await Techno.findOne(parseInt(request.params.id, 10));
            response.json(techno);
        } catch(error) {
            if (error instanceof Techno.NoTechnoError) {
                response.status(404).send(error.techno);
            } else {
                response.status(500).send(error.message);
            }
        }
    },

    save: async (request, response) => {
        try {
            const techno = new Techno(request.body);
            const newTechno = await techno.save();
            response.status(201).json(newTechno);
        } catch (error) {
            response.status(500).send(error.message);
        }
    },

    delete: async (request, response) => {
        try {
            const technoID = parseInt(request.params.id, 10);
            await Techno.delete(technoID);
            response.status(200).json(`Post with id ${technoID} deleted`);
        } catch(error) {
            response.status(500).send(error.message);
        }
    }

};

module.exports = technoController;