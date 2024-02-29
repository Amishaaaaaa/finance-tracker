const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { User, Sector } = require("../db");
const { Mongoose } = require("mongoose");
const router = Router();


router.post('/signup', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    User.create({
        username: username,
        email: email,
        password: password
    })
    .then (function() {
        res.json({
            msg: 'User Created Successfully'
        });
    })
    .catch (function () {
        res.json({
            msg: 'catch block for if user already exists'
        });
    });
});

router.get('/sectors', async (req, res) => {
    const response = await Sector.find({});
    const reducedData = response.map(item => ({ name: item.name, imageLink: item.imageLink, amount: item.amount }));
    res.send(reducedData)
});

router.post('/sectors/:sectorId', userMiddleware, async (req, res) => {
    const sectorId = req.params.sectorId;
    const username = req.headers.username;
    try {
        await User.updateOne({
            username: username
        }, {
            "$push": {
                mysectors: sectorId
            }
        })
    } catch(e) {
        console.log(e)
    }
    res.json({
        message: "Sector Added!"
    })
});

router.get('/my-sectors', userMiddleware, async (req, res) => {
    const response = await User.findOne({
        username: req.headers.username
    });
    const sectors = await Sector.find({
        _id: {
            "$in": response.mysectors
        }
    })
    res.json({
        sectors: sectors
    });
})
module.exports = router;