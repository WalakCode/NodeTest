const userRepository = require('../../persistence/respository/user.repository')
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMEMAIL,
      pass: process.env.EMEPASS,
    },
});


const registerUser = async(user) => {

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(emailRegex.test(user.email)){
        const {email,pass} = user


       
        const data = await userRepository.createUser([email, pass])
        let id;
        data.rows.forEach(e => {
            id = e.id
        });
        transporter.sendMail({
            from: '"Hansen Joan Gil" <gilhansen96@gmail.com>', 
            to: user.email, 
            subject: "Verificacion de correo",
            html:`<a href='http://localhost:8080/verify/${id}'>verificar</a>`, 
        });
        return user
    }else{
        return {error:'correo no valido'}
    }

}

const verifyUsers = async (id) =>{
    let status;
    const data = await userRepository.findUser(id)
    data.forEach(e => {
        status = e.verify
    });

    if(status){
        return {status:'already verify'}
    }else if(status == false){
        const data = await userRepository.verifyUser(!status,id)
        return {message:'verify'}
    }else{
        return null
    }

}



module.exports = {
    registerUser,
    verifyUsers
}