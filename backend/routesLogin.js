const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('./db');
const router = express.Router();
const bcrypt = require('bcrypt');

// Chave secreta para assinar o token
const SECRET_KEY = 'sua_chave_secreta';

// Rota para login
router.post('/login', async (req, res) => {
  const { login, senha } = req.body;

  try {
    // Busca o usuário pelo login (sem comparar a senha no SQL)
    const [userResult] = await connection.query('SELECT * FROM usuarios WHERE login = ?', [login]);

    if (userResult.length === 0) {
      return res.status(404).json({ error: 'Usuário ou senha incorretos' });
    }

    const usuario = userResult[0];
    let userData = {};

    // !!!!!!!!!!!! isso acontece tbm com o funcionário, mas só se ele tiver uma conta atualizada, aí ficaria tipo if cadastrado true ele faz a função tbm
    if (usuario.tipo_usuario === 'empresa' || usuario.tipo_usuario === 'psicologo') {
    // Comparar a senha fornecida com a senha criptografada
    const match = await bcrypt.compare(senha, usuario.senha);
    if (!match) {
      return res.status(404).json({ error: 'Usuário ou senha incorretos' });
    }}

    // Verifica o tipo de usuário e busca as informações adicionais
    if (usuario.tipo_usuario === 'empresa') {
      const [empresaData] = await connection.query('SELECT * FROM cadastroempresa WHERE ID = ?', [usuario.id_referencia]);
      userData = empresaData[0];
    } else if (usuario.tipo_usuario === 'funcionario') {
      const [funcionarioData] = await connection.query('SELECT * FROM contaFuncionarios WHERE id = ?', [usuario.id_referencia]);
      userData = funcionarioData[0];
    } else if (usuario.tipo_usuario === 'psicologo') {
      const [psicologoData] = await connection.query('SELECT * FROM psicologos WHERE psicologo_id = ?', [usuario.id_referencia]);
      userData = psicologoData[0];
    }

    // Informações que serão armazenadas no token
    const payload = {
      id: usuario.id,
      tipo_usuario: usuario.tipo_usuario,
      id_referencia: usuario.id_referencia,  // ID relacionado ao tipo de usuário (empresa, funcionário ou psicólogo)
      perfil: userData  // Informações adicionais do perfil (empresa, funcionário ou psicólogo)
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    // Retorna o token e as informações adicionais para o frontend
    res.json({ token, perfil: userData });
  } catch (err) {
    console.error('Erro ao autenticar o usuário:', err);
    res.status(500).json({ error: 'Erro ao processar o login' });
  }
});

module.exports = router;

// const express = require('express');
// const jwt = require('jsonwebtoken');
// const connection = require('./db');
// const router = express.Router();
// const bcrypt = require('bcrypt');

// exports.login = async (req, resp) => {
//   try {
//       // fetch data
//       const { email, password } = req.body

//       // validation for fields required
//       if (!email || !password) {
//           return resp.status(200).json({
//               status: "Failed",
//               msg: "All fields are required in login !",
//           })
//       }

//       // check if email exists in database
//       // We also populate additionDetails
//       const user = await User.findOne({ email: email })
//           .populate("additionalDetails")
//           .exec()

//       console.log("Data fetched about User from Db:", user)
//       // If user not found with provided email

//       if (!user) {
//           return resp.status(200).json({
//               status: "Failed",
//               msg: "User with given email dont exists. try again !"
//           })
//       }

//       // user exists check password with hashed password

//       const checkHashedPassword = await bcrypt.compare(password, user.password)


//       // password is correct generate Token
//       if (checkHashedPassword) {

//           // In token we send user id, email and accountType

//           const payload = {
//               id: user._id,
//               email: user.email,
//               accountType: user.accountType,
//           }

//           const tokenOptions = {
//               expiresIn: "24h"
//           }

//           //Token Expires in 2 hours
//           const token = jwtToken.sign(payload, process.env.JWT_SECRET, tokenOptions)

//           // we update the object
//           // send token and password 
//           user.password = undefined;
//           user.token = token;
//           console.log("User Modified", user)

//           // generate cookie

//           const cookieOptions = {
//               // expires in 3days
//               //expiresIn:"3hr, 3days" 

//               expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
//               httpOnly: true,
//           }

//           resp.cookie("token", token, cookieOptions).
//               // Req body
//               status(200).json({
//                   success: "Success",
//                   token,
//                   user,
//                   message: 'User Logged in successfully !',
//               })

//       }
//       else {
//           return resp.status(200).json({
//               status: "Failed",
//               msg: "Password dont match ! Try Again !"
//           })
//       }

//   } catch (error) {
//       console.log(error);
//       return resp.status(200).json({
//           status: "Failed",
//           message: 'Login Failure, please try again',
//           errormsg: error
//       });
//   }
// }