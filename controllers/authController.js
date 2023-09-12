const User = require('../models/User')
const models = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { error, success } = require('../utils/responseWrapper');

const SignupController = async (req, res) => {
     try {
          const { name, email, password } = req.body;
          if (!email || !password || !name) {
               return res.send(error(400, 'all feild are required'))
          }
          const olduser = await User.findOne({ email })
          if (olduser) {
               return res.status(error(409, 'user already exist'))
          }
          const hash = await bcrypt.hash(password, 10);
          const user = await User.create({
               name,
               email,
               password: hash
          })
          return res.send(success(200, 'user create successfully'))
     } catch (error) {
          return res.send(error(500, e.message))
     }
}
const LoginController = async (req, res) => {
     try {
          const { email, password } = req.body;
          if (!email || !password) {
               return res.send(error(400, 'all feild are required'))
          }
          const user = await User.findOne({ email }).select('+password')
          if (!user) {
               return res.send(error(404, 'user not exist'))
          }
          const matched = await bcrypt.compare(password, user.password)
          if (!matched) {
               return res.send(error(400, 'incorrect password'))
          }
          const accessToken = generateAccessToken({ _id: user._id });

          const refreshToken = generateRefreshToken({ _id: user._id });
          res.cookie("jwt", refreshToken, {
               httpOnly: true,
               secure: true,
          });
          return res.send(success(200, { accessToken }))

     } catch (error) {
          return res.send(error(500, e.message))
     }
}

const logoutController = async (req, res) => {
     try {
          res.clearCookie('jwt', {
               httpOnly: true,
               secure: true,
          })
          return res.send(success(200, 'user logged out'))
     } catch (e) {
          return res.send(error(500, e.message));
     }
}

const generateAccessToken = (data) => {
     try {
          const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: "1d" })
          return token;
     } catch (error) {
          console.log(error)
     }
}
const generateRefreshToken = (data) => {
     try {
          const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: "1y" })
          return token;
     } catch (error) {
          console.log(error)
     }
}

const refreshAccessTokenController = async (req, res) => {
     const cookies = req.cookies;
     if (!cookies.jwt) {
          return res.send(error(401, "Refresh token in cookie is required"));
     }
     const refreshToken = cookies.jwt;
     try {
          const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY)
          console.log(`decoded`, decoded);
          const _id = decoded._id;
          const accessToken = generateAccessToken({ _id })
          return res.send(success(200, { accessToken }))

     } catch (e) {
          console.log(e)
          return res.status(error(401, 'invalid refresh tokenj'))
     }
}

module.exports = {
     SignupController,
     LoginController,
     refreshAccessTokenController,
     logoutController
}