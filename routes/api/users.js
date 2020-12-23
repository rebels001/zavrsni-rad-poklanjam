const express = require("express");
const router = express.Router();
const bcryt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult } = require("express-validator/check")

const User = require("../../models/User");

// @route POST api/users
// @desc Register user
// @access Public
router.post("/",[
    check("name","Potrebno je unijeti ime").not().isEmpty(),
    check("email","Potrebno je unijeti ispravan E-mail").isEmail(),
    check("password","Unesite sifru dulju od 5 znakova").isLength({ min: 6 })
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password} = req.body;

    try { 
        let user = await User.findOne({ email });

        // See if user exists
        if(user) {
            return res.status(400).json({ errors: [{msg: "Korisnik vec postoji"}]});
        }

        user = new User({
            name, 
            email,
            password
        })
    
        // Encrypt password
        const salt = await bcryt.genSalt(10);

        user.password = await bcryt.hash(password, salt);

        await user.save();
  
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