const session = require("express-session")
const userService = require("../../business/services/user.services")

const getRegister = (req,res) => {
    if(req.session.authorized){
        res.render('home')
    }else{
        return res.render('login')
    }
    
}

const postRegister = async(req,res) => {
    const [user,code] = await userService.registerUser(req.body)   
    // req.session.user = user;
    // req.session.code = code
    // req.session.authorized = true;
    res.render('home');
}


const getLogin = async(req,res) =>{
     res.render('login')
}

const postLogin = async(req,res) =>{
    const user = await userService.findUser(req.body)
}

module.exports = {
    getRegister,
    postRegister,
}