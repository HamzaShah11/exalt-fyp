const express= require("express")
const authController= require('../controllers/auth'); 
const router=express.Router();
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

//register admin
router.post('/',(req, res)=>{
    console.log(req.body);
    const { name, email, password, passwordConfrim } = req.body;
    db.query('SELECT email FROM admin where email=?', [email], async (error, results) => {
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            return res.json( {
                message: 'That email is already in use'
            })
        } else if (password !== passwordConfrim) {
            return res.json( {
                message: 'passwords do not match'
            });
        }
        db.query('INSERT INTO admin SET ?', { name: name, email: email, password: password }, (error, results) => {
            if (error) {
                console.log(error);
            } else {

                console.log("results");
                return res.json({
                    message: 'Admin Registered'
                });

            }
        })
    });
});
router.get('/',(req,res)=>{
    db.query('SELECT email FROM admin',  (result) => {
res.json({message:result});

    })
})
// router.post('/login',authController.login );
// router.post('/cat',authController.cat);
// router.post('/category',authController.category);
module.exports=router;