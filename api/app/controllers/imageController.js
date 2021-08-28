const { json } = require('express');
const Image = require('../models/Image');

const imageController = {
    findAll: async (_, response) => {
        try {
            const images = await Image.findAll();
            response.json(images);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    findOne: async (request, response) => {
        try {
            const image = await Image.findOne(parseInt(request.params.id, 10));
            response.json(image);
        } catch(error) {
            if (error instanceof Image.NoImageError) {
                response.status(404).send(error.image);
            } else {
                response.status(500).send(error.message);
            }
        }
    },

    save: async (request, response) => {
        try {
            const image = new Image(request.body);
            const newImage = await image.save();
            response.status(201).json(newImage);
        } catch (error) {
            response.status(500).send(error.message);
        }
    },

    delete: async (request, response) => {
        try {
            const imageID = parseInt(request.params.id, 10);
            await Image.delete(imageID);
            response.status(200).json(`Post with id ${imageID} deleted`);
        } catch(error) {
            response.status(500).send(error.message);
        }
    }

};

module.exports = imageController;