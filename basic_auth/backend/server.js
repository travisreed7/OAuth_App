let express = require("express");
let login = require('./routes/loginroutes');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let router = express.Router();

// Routes to handle user registration and login
router.post('/register',login.register);
router.post('/login',login.login)
app.use('/api', router);
app.listen(process.env.PORT || 3000);
