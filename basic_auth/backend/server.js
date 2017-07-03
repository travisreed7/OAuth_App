var express = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');

var app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('basic_auth/build'));
}

const home = require('../src/components/Home');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});

//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login)
app.use('/api', router);
app.use(home);
app.listen(3000);
