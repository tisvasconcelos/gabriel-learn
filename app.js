var five = require("johnny-five"),
    board = new five.Board();

board.on("ready", function() {
  var createError = require('http-errors');
  var express = require('express');
  var path = require('path');
  var cookieParser = require('cookie-parser');
  var logger = require('morgan');
  var sassMiddleware = require('node-sass-middleware');
  var exphbs = require("express-handlebars");

  var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/portuguese');

  var app = express();
  var exphbs = require("express-handlebars");

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));

  app.engine("hbs", exphbs({
    defaultLayout: "layout",
    extname: ".hbs",
    helpers: require("./public/javascripts/helpers.js").helpers, // same file that gets used on our client
    partialsDir: "views/partials/", // same as default, I just like to be explicit
    layoutsDir: "views/layouts/" // same as default, I just like to be explicit
  }));

  app.set('view engine', 'hbs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  }));
  app.use(express.static(path.join(__dirname, 'public')));

  let led = {
    green: new five.Led(12),
    red: new five.Led(11)
  };

  app.get('/led/blink', function(req, res){
    let ledBlink = req.query.color ? led[req.query.color] : led.green;
    res.status(200);
    res.send('led on!');
    ledBlink.blink(100);
    setTimeout(() => {
      ledBlink.stop();
      ledBlink.off();
    }, 3000);
  });

  app.get('/led/on', function(req, res){
    res.status(200);
    res.send('led on!');
    led.green.on();
  });

  app.get('/led/off', function(req, res){
    res.status(200);
    res.send('led off!');
    led.green.off();
  });

  app.use('/', indexRouter);
  app.use('/portuguese', usersRouter);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
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

  app.listen(3000, function() { // Actually turn the server on
    console.log("Server's up at http://localhost:3000!");
  });
});
