const { json } = require('express');
const Message = require('../models/Message');

const messageController = {
    findAll: async (_, response) => {
        try {
            const messages = await Message.findAll();
            response.json(messages);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    findOne: async (request, response) => {
        try {
            const message = await Message.findOne(parseInt(request.params.id, 10));
            response.json(message);
        } catch(error) {
            if (error instanceof Message.NoMessageError) {
                response.status(404).send(error.message);
            } else {
                response.status(500).send(error.message);
            }
        }
    },

    save: async (request, response) => {
        try {
            const message = new Message(request.body);
            const newMessage = await message.save();
            response.status(201).json(newMessage);
        } catch (error) {
            response.status(500).send(error.message);
        }
    },

    delete: async (request, response) => {
        try {
            const messageID = parseInt(request.params.id, 10);
            await Message.delete(messageID);
            response.status(200).json(`Post with id ${messageID} deleted`);
        } catch(error) {
            response.status(500).send(error.message);
        }
    }

};

module.exports = messageController;