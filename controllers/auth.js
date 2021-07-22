const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

//login

exports.login = async (req, res) => {
    try {
        console.log("request data",req);
        const email=req.body.email;
        const password=req.body.password;
        const name=req.body.name;
        console.log("name of user",password)
        // const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).render('login', {
                message: 'please provide email and password'
            })
        }
        db.query('SELECT * FROM admin WHERE email = ?', [email], async (error, results) => {
            console.log("data",results)
            console.log("data coming from data base",results[0].password)
            if(password==results[0].password)
            {
                console.log("login success");
                res.status(200).render('dashboard')
            }
            else{
                res.status(401).render('login',{message:"'Passowrd invalid"})
            }
        })
    } catch (error) {
        console.log(error);
    }
} 


//register user function
exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfrim } = req.body;
    db.query('SELECT email FROM admin where email=?', [email], async (error, results) => {
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            })
        } else if (password !== passwordConfrim) {
            return res.render('register', {
                message: 'passwords do not match'
            });
        }
        
        let hashedPassword = await bcrypt.hash(password, 8)
        console.log(hashedPassword);
        db.query('INSERT INTO admin SET ?', { name: name, email: email, password: password }, (error, results) => {
            if (error) {
                console.log(error);
            } else {

                console.log("results");
                return res.render('register', {
                    message: 'Admin Registered'
                });

            }
        })
    });
}

// exports.cat = (req, res) => {
//     console.log(req.body);
//     const {name} = req.body;
//     db.query('SELECT name FROM cat where name=?', [name], async (error, results) => {
//         if (error) {
//             console.log(error)
//         }
//         if (results.length > 0) {
//             return res.render('cat', {
//                 message: 'That name is already in use'
//             })
//         } 
        
//         db.query('INSERT INTO cat SET?', { name: name}, (error, results) => {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log("results");
//                 return res.render('cat', {
//                     message: 'cat Registered'
//                 });

//             }
//         })
//     });
//  }

//category insert
exports.category = (req, res) => {
    console.log(req.body);
    const { name,parent } = req.body;
    db.query('SELECT name FROM category where name=?', [name], async (error, results) => {
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            return res.render('category', {
                message: 'That name is already in use'
            })
        }
        
        db.query('INSERT INTO category SET name = ?,category = (SELECT id FROM category WHERE name =' + parent + ')', { name: name, parent:parent}, (error, results) => {
            if (error) {
                console.log(error);
            } else {

                console.log("results");
                console.log(parent)
                console.log(name)
                return res.render('category', {
                    message: 'category added sucessfully',
                    
                });

            }

        })
        
          
    });
}



// //subcategory insert
// exports.subcategory = (req, res) => {
//     console.log(req.body);
//     const { name, parent_category } = req.body;
//     db.query('SELECT name FROM subcategory where name=?', [name], async (error, results) => {
//         if (error) {
//             console.log(error)
//         }
//         if (results.length > 0) {
//             return res.render('subcategory', {
//                 message: 'That name is already in use'
//             })
//         }
//         db.query('INSERT INTO subcategory SET name = ?, category = (SELECT id FROM category WHERE name = male)', [name, category], (err, result) => {
//             if (error) {
//                 console.log(error);
//             } else {

//                 console.log("results");
//                 return res.render('subcategory', {
//                     message: 'sub category added sucessfully'
//                 });

//             }
//         });
//     });   
// }



