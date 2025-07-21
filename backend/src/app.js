require('dotenv').config();
const express = require('express')
const songRoutes = require('./routes/song.routes')
const cors = require('cors');



const app = express();

app.get('./',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})


app.use(express.json());
app.use(cors());

app.use('/',songRoutes);

module.exports = app;