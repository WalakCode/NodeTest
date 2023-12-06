const userService = require("../../business/services/user.services")

const getRegister = (req,res) => {
    if(req.session.authorized){
        res.render('home')
    }else{
        return res.render('login')
    }
    
}

const postRegister = async(req,res) => {
    const user = await userService.registerUser(req.body)
    req.session.user = user;
    req.session.authorized = true;
    res.render('home');
}

const Verify = async(req,res) =>{
    const data = await userService.verifyUsers(req.params.id)
    if(data.status == 'already verify'){
        console.log(data,'controller')
        res.render('login')
    }else if(data.status == 'verify'){
        res.render('si')
    }
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
    Verify
}