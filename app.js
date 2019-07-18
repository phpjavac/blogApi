var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var env = require('./utils/envalid');
var routes = require('./routes/index');
var jwtAuth = require('./middleware/jwt');
var bodyParser = require('body-parser')

const { HOST, PORT } = env;
require('./utils/mongoDB')
require('./middleware/errorHandler')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
jwtAuth(app)
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
// Listen the server
app.listen(PORT, HOST, () =>
  console.log(`Server is listening on http://${HOST}:${PORT}`)
);
routes(app);
module.exports = app;
