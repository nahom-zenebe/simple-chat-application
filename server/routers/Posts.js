const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models');
const {validateToken}=require('../middleware/Authmiddle');
const { where } = require('sequelize');
// Get all posts with likes
router.get("/", async (req, res) => {
    try {
        const listOfPosts = await Posts.findAll({ include: [Likes] });
        res.json(listOfPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching posts.' });
    }
});

// Get post by ID
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Posts.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the post.' });
    }
});

// Create a new post
router.post('/', async (req, res) => {
    try {
        const post = req.body;
        const data = await Posts.create(post);
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the post.' });
    }
});


router.get('/byuserId/:id', async (req, res) => {
   const id=req.params.id
    try {
        const listOfPosts = await Posts.findAll({where:{UserId:id}});
        if (!listOfPosts ) {
            return res.status(404).json({ error: 'Post not found.' });
        }
        res.json(listOfPosts );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the post.' });
    }
});


router.post('/',validateToken,async(req,res)=>{
    const post=req.body
    post.username=req.user.username
post.UserId=req.user.id
    await Posts.create(post)
    res.json(post)
})

router.delete("/:postId", validateToken, async (req, res) => {

    const postId = req.params.postId;


    if (!postId || isNaN(postId)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }

    try {
        const deleted = await Posts.destroy({
            where: {
                id: Number(postId), 
            },
        });

        if (deleted === 0) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router
