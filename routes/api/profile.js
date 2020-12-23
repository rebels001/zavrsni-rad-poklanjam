const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const Profile = require("../../models/Profile");
const User = require("../../models/User")

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id}).populate("user",["name"]);

        if(!profile) {
            return res.status(400).json({ msg: "Nema profila za ovog korisnika"});
        }

        res.json(profile);

    } catch(err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


// @route POST api/profile
// @desc Create or update user profile
// @access Private
router.post("/", [auth, []], 
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            location,
            telephone,
            bio    
        } = req.body;

    //BUild profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if(location) profileFields.location = location;
    if(telephone) profileFields.telephone = telephone;
    if(bio) profileFields.bio = bio;


    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if(profile) {
            //Update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields}, { new: true});      

            return res.json(profile);
        }
        //Create
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

// @route GET api/profile/user/:user_id
// @desc Get profile by user id
// @access Public
router.get("/user/:user_id", async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name"]); 

        if(!profile) return res.status(400).json({ msg: "Profil ne postoji" });    

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
           return res.status(400).json({ msg: "Profil ne postoji"});        
        }
        res.status(500).send("Server error");
    }
})

module.exports = router;