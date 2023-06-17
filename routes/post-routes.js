const express = require('express');
const { getPost, deletePost, getEditPost, editPost, getPosts, getAddPost, addPost } = require('../controllers/post-controllers');

const router = express.Router();

router.get('/post/:id', getPost);
router.delete('/post/:id', deletePost);
router.get('/edit/:id', getEditPost);
router.put('/edit/:id', editPost);
router.get('/posts', getPosts);
router.get('/add-post', getAddPost);
router.post('/add-post', addPost);

module.exports = router;
