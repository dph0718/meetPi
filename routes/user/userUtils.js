
const router = require("express").Router();
const eventControl = require("../../controllers/eventController");
const userControl = require("../../controllers/userController");


router.get('/:userId', (req,res)=>{
    userControl.getUser(req, res);
});



module.exports = router;
