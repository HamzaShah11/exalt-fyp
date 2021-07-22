const express= require ("express");
const path = require("path");
const mysql = require("mysql");
const dotenv =require('dotenv');
const cookieParser=require('cookie-parser');
var cors = require('cors')


dotenv.config({ path: './.env'});

const app = express();
app.use(cors())
app.set('view engine','hbs')

const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE  

});
const publicdirectory =path.join(__dirname,'./public')
app.use(express.static(publicdirectory));
app.use(express.urlencoded({extended:false}))
app.use(express.json()) 
app.use(cookieParser())

db.connect( (error)   => {
    if(error){
        console.log(error)
    }else
    {
    console.log("MYSQL connected...")
     }
})


app.use('/auth',require('./routes/auth'))
app.use('/login',require('./routes/login'))
app.use('/cat',require('./routes/cat'))


app.listen(5000,()=>
{
    console.log("server started on port 5000")
})


