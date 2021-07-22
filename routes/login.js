const express= require("express")

const router=express.Router();
const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

//login
router.post('/',(req, res)=>{
    try {
        console.log("request data",req);
        const email=req.body.email;
        const password=req.body.password;
        const name=req.body.name;
        console.log("name of user",password)
        // const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json( {
                message: 'please provide email and password'
            })
        }
        db.query('SELECT * FROM admin WHERE email = ?', [email], async (error, results) => {
            console.log("data",results)
            console.log("data coming from data base",results[0].password)
            if(password==results[0].password)
            {
                console.log("login success");
                res.json({message:'GO LOGIN'})
            }
            else{
                res.status(401).json({message:"'Passowrd invalid"})
            }
        })
    } catch (error) {
        console.log(error);
    }
});
module.exports=router;