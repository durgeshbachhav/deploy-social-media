const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const dbConnect = require('./dbConnect')
const authRouter = require('./routes/authRouter')
const postRouter = require('./routes/postRouter')
const userRouter = require('./routes/userRouter')
const cloudinary = require('cloudinary').v2;
const morgan = require('morgan')
const cookieparser = require('cookie-parser')
const cors = require('cors')
dotenv.config();



cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECREAT,
});



const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use(express.json({ limit: '10mb' }))
app.use(morgan('common'))
app.use(cookieparser())
app.use(cors({
     credentials: true,
     origin: process.env.CLIENT_ORIGIN
}))

app.use('/auth', authRouter)
app.use('/posts', postRouter)
app.use('/user', userRouter)


app.use(express.static(path.join(__dirname,"./client/build")));

app.get('*',function(_, res){
     // res.sendFile(path.resolve("./client","build", "index.html"))
     res.sendFile(path.join(__dirname,"./client/build/index.html"),
     function(err){
          res.status(500).send(err);
     })
})

const PORT = process.env.PORT || 4200;
dbConnect();

app.listen(PORT, () => {
     console.log(`listening on port :${PORT}`);
})