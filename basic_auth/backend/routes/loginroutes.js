let mysql = require('mysql');
let credentials;
if(process.env.NODE_ENV === 'production') {
    credentials = 'process.env.JAWSDB_URL';
} else {
    credentials = {
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        database : 'Auth'
    };
}

let connection = mysql.createConnection(credentials);

connection.connect(function(err) {
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error connecting database", err);
    }
});

exports.register = function(req,res) {
    console.log("req", req.body);
    let today = new Date();
    let users={
        "first_name":req.body.first_name,
        "last_name":req.body.last_name,
        "email":req.body.email,
        "password":req.body.password,
        "created":today,
        "modified":today
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results) {
        if (error) {
            console.log("Error occurred",error);
            res.send({
                "code":400,
                "failed":"Error occurred"
            })
        }else{
            console.log("The results are: ", results);
            res.send({
                "code":200,
                "success":"User registered successfully"
            });
        }
    });
}

exports.login = function(req,res) {
    let email= req.body.email;
    let password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results) {
        if (error) {
            console.log("Error occurred",error);
            res.send({
                "code":400,
                "failed":"Error occurred"
            })
        } else {
            console.log('The results are: ', results);
            if(results.length > 0){
                if(results[0].password === password){
                    res.send({
                        "code":200,
                        "success":"Login successful"
                    });
                }
                else{
                    res.send({
                        "code":204,
                        "success":"The email or password you entered is invalid"
                    });
                }
            }
            else {
                res.send({
                    "code":204,
                    "success":"Email does not exist"
                });
            }
        }
    });
}


