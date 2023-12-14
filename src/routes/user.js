const express = require('express')
const router = express.Router()
const {getRegister,postRegister,postVerify} = require('../presentation/controller/user.controller')

router.get('/',getRegister)
    .post('/',postRegister)
    .get('/login')
    .post('/verify',postVerify)

module.exports  = router