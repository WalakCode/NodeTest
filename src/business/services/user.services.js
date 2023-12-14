const userRepository = require("../../persistence/respository/user.repository");
const transporter = require("../services/nodemailer.services");

const registerUser = async (user) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (emailRegex.test(user.email)) {
    const { email, pass } = user;

    const auth = await userRepository.getUser([email]);
    if (auth.rows.length > 0) {
      return { error: "el correo ya esta registrado " };
    } else {

      await userRepository.createUser([email, pass]);
      const userId = await userRepository.getUser([email])

      const id = userId.rows[0]['id']

      const code = Math.floor(Math.random() * 900000) + 100000;

      transporter.sendMail({
        from: '"Hansen Joan Gil" <gilhansen96@gmail.com>',
        to: user.email,
        subject: "Verificacion de correo",
        html: `Codigo de verificacion: ${code}, `,
      });

      await userRepository.insertCode([id,code])
      return id
    }
  } else {
    return { error: "correo no valido" };
  }
};

const verifycode = async (id,code) =>{
  
  const getCode = await userRepository.getCode([id])
  const dateNow = new Date()
  const datecreated = getCode.rows[0]['datecreated']

  if(dateNow - datecreated > 300000){
    if(getCode.rows[0].code == code){

    }else{
      return {message:'codigo no coincide'}
    }
  }else{
    return {message:'codigo expirado '}
  }




 
}

module.exports = {
  registerUser,
  verifycode
};
