const router = require('express').Router();
const {write,getWritingById,getAllWriting,commentToWriting,edit} = require('../controller/board');
const {isAuthorized} = require('../controller/webToken')


router.post('/write', write);
router.get("/:id", getWritingById);
router.get("/", getAllWriting);
router.post("/comment/:id", commentToWriting);
router.post("/edit/:id", edit);




module.exports = router;