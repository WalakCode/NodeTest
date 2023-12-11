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

      const code = Math.floor(Math.random() * 900000) + 100000;

      await transporter.sendMail({
        from: '"Hansen Joan Gil" <gilhansen96@gmail.com>',
        to: user.email,
        subject: "Verificacion de correo",
        html: `Codigo de verificacion: ${code}, `,
      });
      
      return user,code;
    }
  } else {
    return { error: "correo no valido" };
  }
};

module.exports = {
  registerUser,
};
