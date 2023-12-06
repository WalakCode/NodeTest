const express = require('express')
const router = express.Router()
const {getRegister,postRegister,Verify} = require('../presentation/controller/user.controller')

router.get('/',getRegister)
    .post('/',postRegister)
    .get('/login')
    .get('/verify/:id',Verify)

module.exports  = router