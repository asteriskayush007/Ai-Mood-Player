require('dotenv').config()

const app = require('./src/app')
const cors = require('cors');
const connectDB = require('./src/db/db')

app.use(cors());

app.get('/',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})

connectDB();

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})