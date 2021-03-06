const { json } = require("express");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const { restart } = require("nodemon");
const auth = require("../../middleware/auth");

const Post = require("../../models/Posts");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route POST api/posts
// @desc Create a post
// @access Private
router.post("/", [auth, [
    check("text", "Tekst je potreban").not().isEmpty()
] ] ,
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {            
            const user = await User.findById(req.user.id).select("-password");
    
            const newPost = new Post({
                text: req.body.text,
                tittle: req.body.tittle,
                itemLocation: req.body.itemLocation,
                number: req.body.number,
                category: req.body.category,
                name: user.name,
                user: req.user.id
            });

            const post = await newPost.save();
            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error")
        }

});

// @route PUT api/posts
// @desc Update a post
// @access Private
router.put("/", [auth, [] ] ,
    async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {            
            let post = await Post.findById(req.body.id);
            post.imageUrl = req.body.imageUrl
            const updatedPost = await post.save()

            res.json(updatedPost);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error")
        }

});

// @route GET api/posts
// @desc GET all posts
// @access Private
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

// @route GET api/posts/:id
// @desc GET post by ID
// @access Private
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({ msg: "Oglas nije pronađen" })
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);        
        if(err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Oglas nije pronađen" })
        }
        res.status(500).send("Server Error")
    }
})

// @route DELETE api/posts/:id
// @desc Delete a post
// @access Private

router.delete("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({ msg: "Oglas nije pronađen" })
        }

        // Check user
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Korisnik nije autoriziran" })
        }

        await post.remove();

        res.json({ msg: "Oglas je izbrisana" });
    } catch (err) {
        console.error(err.message);      
        if(err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Oglas nije pronađen" })
        }  
        res.status(500).send("Server Error")
    }
})

module.exports = router;