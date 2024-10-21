const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

dotenv.config();

//  mongo connection
connectDB();

const app = express();

//   config
const PORT = process.env.PORT || 5000;

//   middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//  routes
app.use("/api/v1/user", require("./routes/userRoutes"));

// app.get('/',(req,res)=>[
//     res.status(200).send({
//         message:"server running"
//     })
// ])

// listen
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
