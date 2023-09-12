const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

module.exports = async () => {
     const mongouri = process.env.MONGO_URI
     try {
          const connect = await mongoose.connect(mongouri, {
               useNewUrlParser: true,
               useUnifiedTopology: true
          })
          console.log(`mongodb connected: ${connect.connection.host}`)

     } catch (error) {
          console.log("error while connecting database =>",error)
          process.exit(1);
     }
}

