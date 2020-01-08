const express = require('express');
const app = express();

// const userController = require('../controller/user');
// const postController = require('../controller/post');
// const postP = require('../controller').Post;
const userController = require('../controller/index').User;
const postController = require('../controller/index').Post;

app.get('/api', (req, res) => {
    res.status(200).send({
        data: "Welcome Node Sequlize API v1"
    })
})

app.get('/api/users', userController.getAllUsers);

app.post('/api/user/create', userController.create);

app.put('/api/user/:userId', userController.update);

app.get('/api/:userId/posts', postController.getAllPostsOfUser);

app.post('/api/post/create', postController.createPost);

app.put('/api/:postId', postController.update);


module.exports = app;