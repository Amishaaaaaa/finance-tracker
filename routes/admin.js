const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Sector } = require("../db");
const router = Router();


router.post('/signup', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    Admin.create({
        username: username,
        email: email,
        password: password
    })
    .then (function() {
        res.json({
            msg: 'Admin Created Successfully'
        });
    })
    .catch (function () {
        res.json({
            msg: 'catch block for if admin dalready exists'
        });
    });
})

router.post('/sectors', adminMiddleware, async (req, res) => {
    const  name = req.body.name;
    const imageLink = req.body.imageLink;
    const amount = req.body.amount;
    const isPublic = req.body.isPublic;
    //do input validation later
    const newSector = await Sector.create({
        name: name,
        imageLink: imageLink,
        amount: amount,
        isPublic: isPublic
    })
    console.log(newSector);
    res.json({
        msg: "sector created successfully", sectorId: newSector._id
    })
    
})
    
router.get('/sectors', adminMiddleware, async (req, res) => {
    const response = await Sector.find({});

    res.json({
        Sector: response
    })
});

module.exports = router;