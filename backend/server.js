const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')
const  cors = require('cors')
const path = require('path')
const routers = require('./routes/routes')
const bodyParser = require('body-parser')


connectDB()

const app = express()

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))


app.use('/api', routers)



const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server running on port  ${PORT}`))