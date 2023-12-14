const userService = require("../../business/services/user.services")

const getRegister = (req,res) => {
    if(req.session.user){
        res.render('home')
    }else{
        return res.render('index')
    }
}

const postRegister = async(req,res) => {
   const status = await userService.registerUser(req.body) 
   if(status['error']){
        res.json(status)
   }else{
    req.session.user = status
    res.render('home')
   }
}

const postVerify = async(req,res) =>{
     if(req.session.user){
        const status = await userService.verifycode(req.session.user,req.body['code'])
        if(status['error']){
            res.json(status)
        }else{
            res.redirect('main')
        }
     }else{
        res.render('login')
     }
}

const getMain = async(req,res) =>{
    if(req.session.user){
        res.render('main')
    }else{
        return res.render('index')
    }
}

module.exports = {
    getRegister,
    postRegister,
    postVerify,
    getMain
}