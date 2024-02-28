const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { User, Sector } = require("../db");
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

router.post('/sectors/:sectorId', userMiddleware, (req, res) => {

});

router.get('/my-sectors', userMiddleware,(req, res) => {

})
module.exports = router;