const session = require("express-session")
const userService = require("../../business/services/user.services")

const getRegister = (req,res) => {
    if(req.session.user){
        res.render('home')
    }else{
        return res.render('index')
    }
}

const postRegister = async(req,res) => {
   const data = await userService.registerUser(req.body) 
   if(data['error']){
        res.json(data)
   }else{
    req.session.user = data
    res.render('home')
   }
}

const postVerify = async(req,res) =>{
     if(req.session.user){
        await userService.verifycode(req.session.user,req.body['code'])
     }else{
        res.render('login')
     }
}

const postLogin = async(req,res) =>{
    const user = await userService.findUser(req.body)
}

module.exports = {
    getRegister,
    postRegister,
    postVerify
}