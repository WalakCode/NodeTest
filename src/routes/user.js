const express = require('express')
const router = express.Router()
const {getRegister,postRegister,postVerify,getMain} = require('../presentation/controller/user.controller')

router.get('/',getRegister)
    .post('/',postRegister)
    .get('/login')
    .get('/main',getMain)
    .post('/verify',postVerify)

module.exports  = router