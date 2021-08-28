const { json } = require('express');
const Avatar = require('../models/Avatar');

const avatarController = {
    findAll: async (_, response) => {
        try {
            const avatars = await Avatar.findAll();
            response.json(avatars);
        } catch(error) {
            response.status(500).send(error.avatar);
        }
    },

    findOne: async (request, response) => {
        try {
            const avatar = await Avatar.findOne(parseInt(request.params.id, 10));
            response.json(avatar);
        } catch(error) {
            if (error instanceof Avatar.NoAvatarError) {
                response.status(404).send(error.avatar);
            } else {
                response.status(500).send(error.avatar);
            }
        }
    },

    save: async (request, response) => {
        try {
            const avatar = new Avatar(request.body);
            const newAvatar = await avatar.save();
            response.status(201).json(newAvatar);
        } catch (error) {
            response.status(500).send(error.message);
        }
    },

    delete: async (request, response) => {
        try {
            const avatarID = parseInt(request.params.id, 10);
            await Avatar.delete(avatarID);
            response.status(200).json(`Post with id ${avatarID} deleted`);
        } catch(error) {
            response.status(500).send(error.message);
        }
    }

};

module.exports = avatarController;