const router = require('express').Router();
const {signIn,signOut,signUp,getBalance} = require('../controller/account');


router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.get('/signOut', signOut);
router.get('/getBalance', getBalance);


module.exports = router;