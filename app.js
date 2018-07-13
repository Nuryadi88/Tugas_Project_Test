let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let studentController = require('./app/controllers/student_controller');
let userController = require('./app/controllers/user_controller');

let app = express();

//required for passport
let ensure = require('connect-ensure-login');
let session = require('express-session');
let flash = require('connect-flash');

let passport = require('./app/config/passport');
let memberController = require('./app/controllers/member_controller');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', studentController.GetAllStudent_1);
app.get('/utama', studentController.GetAllStudent_1);
app.get('/index', studentController.getAllStudent);
app.get('/user', userController.getAllUser);


app.get('/new_student', studentController.saveStudentShowForm)
app.post('/save_student', studentController.saveStudent);

app.get('/new_user', userController.saveUserShowForm)
app.post('/save_user', userController.saveUser);

app.get('/update_student/:code', studentController.updateStudentShowForm);
app.post('/update_student', studentController.updateStudent);

app.get('/update_user/:id', userController.updateUserShowForm);
app.post('/update_user', userController.updateUser);

app.get('/student_detail/:code', studentController.getStudent);
app.get('/user_detail/:id', userController.getUser);

app.get('/delete_student/:code', studentController.deleteStudent);
app.get('/delete_user/:id', userController.deleteUser);

//required for passport
app.use(session({secret: 'ilovenodejs'}));
app.use(passport.init());
app.use(passport.session());
app.use(flash());

app.get('/login', memberController.login);
app.post('/login', passport.auth());
app.get('/profile', ensure.ensureLoggedIn(), memberController.myProfile);
app.get('/logout', memberController.logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3088, () => console.log('berjalan'));
   
