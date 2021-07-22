const express = require("express")
const router = express.Router();
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

//add
router.post('/', (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    db.query('SELECT name FROM cat where name=?', [name], async (error, results) => {
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            return res.json({
                message: 'That name is already in use'
            })
        }
        db.query('INSERT INTO cat SET?', { name: name }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log("results");
                return res.json({
                    message: 'cat added sucessfully'
                });;

            }
        })
    });
})
router.get('/', (req, res) => {
    db.query('SELECT name FROM cat', (result) => {
        res.json({ message: result });
    })
})
module.exports = router;