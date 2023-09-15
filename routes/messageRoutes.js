const {addmsg , getAllmsg} = require("../controllers/messageControllers");
const router = require("express").Router();

router.post("/addmsg" , addmsg);
router.post("/getmsgs" , getAllmsg);
module.exports = router;