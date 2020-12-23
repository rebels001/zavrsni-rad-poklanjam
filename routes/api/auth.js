const express = require("express");
const router = express.Router();
const bcryt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const {check, validationResult } = require("express-validator/check")
const auth = require("../../middleware/auth");
const User = require("../../models/User");


// @route GET api/auth
// @access Public
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch(err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});


// @route POST api/users
// @desc Authenticate user & get token
// @access Public
router.post("/",[
    check("email","Potrebno je unijeti ispravan E-mail").isEmail(),
    check("password","Potrebno je unijeti lozinku").exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password} = req.body;

    try { 
        let user = await User.findOne({ email });

        // See if user exists
        if(!user) {
            return res.status(400).json({ errors: [{msg: "Neispravni podaci"}]});
        }

        //Match email and password
        const isMatch = await bcryt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ errors: [{msg: "Neispravni podaci"}]});
        }
  
        const payload = { 
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecret"),
        {expiresIn: 360000},
        (err, token) => {
            if(err) throw err;
            res.json({ token });
        }
        );

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error")
    }

});

module.exports = router;