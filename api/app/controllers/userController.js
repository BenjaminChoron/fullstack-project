const { json } = require('express');
const User = require('../models/User');

const userController = {
    findAll: async (_, response) => {
        try {
            const users = await User.findAll();
            response.json(users);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    findOne: async (request, response) => {
        try {
            const user = await User.findOne(parseInt(request.params.id, 10));
            response.json(user);
        } catch(error) {
            if (error instanceof User.NoUserError) {
                response.status(404).send(error.message);
            } else {
                response.status(500).send(error.message);
            }
        }
    },

    save: async (request, response) => {
        try {
            const user = new User(request.body);
            const newUser = await user.save();
            if (newUser) {
                //on a une valeur de retour, il s'agit d'un INSERT
                response.status(201).json(newUser);
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
            const userID = parseInt(request.params.id, 10);
            await User.delete(userID);
            response.status(200).json(`User with id ${userID} deleted`);
        } catch(error) {
            response.status(500).send(error.message);
        }
    }

};

module.exports = userController;