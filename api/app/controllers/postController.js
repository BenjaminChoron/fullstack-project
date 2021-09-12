const { json } = require('express');
const Post = require('../models/Post');

const postController = {
    findAll: async (_, response) => {
        try {
            const posts = await Post.findAll();
            response.json(posts);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    findAllDrafts: async (_, response) => {
        try {
            const posts = await Post.findAllDrafts();
            response.json(posts);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    findOne: async (request, response) => {
        try {
            const post = await Post.findOne(parseInt(request.params.id, 10));
            response.json(post);
        } catch(error) {
            if (error instanceof Post.NoPostError) {
                response.status(404).send(error.message);
            } else {
                response.status(500).send(error.message);
            }
        }
    },

    findOneDraft: async (request, response) => {
        try {
            const post = await Post.findOneDraft(parseInt(request.params.id, 10));
            response.json(post);
        } catch(error) {
            if (error instanceof Post.NoPostError) {
                response.status(404).send(error.message);
            } else {
                response.status(500).send(error.message);
            }
        }
    },

    save: async (request, response) => {
        try {
            const post = new Post(request.body);
            const newPost = await post.save();
            if (newPost) {
                //on a une valeur de retour, il s'agit d'un INSERT
                response.status(201).json(newPost);
            } else {
                //pas de valeur de retour, c'était un UPDATE
                response.status(204).json('Update done');
            }
        } catch (error) {
            response.status(500).send(error.message);
        }
    },

    saveDraft: async (request, response) => {
        try {
            const post = new Post(request.body);
            const newPost = await post.saveDraft();
            if (newPost) {
                //on a une valeur de retour, il s'agit d'un INSERT
                response.status(201).json(newPost);
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
            const postID = parseInt(request.params.id, 10);
            await Post.delete(postID);
            response.status(200).json(`Post with id ${postID} deleted`);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    deleteDraft: async (request, response) => {
        try {
            const postID = parseInt(request.params.id, 10);
            await Post.deleteDraft(postID);
            response.status(200).json(`Post with id ${postID} deleted`);
        } catch(error) {
            response.status(500).send(error.message);
        }
    }

};

module.exports = postController;