const express = require('express');
const app = express();
var session = require('express-session');


// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());


app.use(session({secret: 'kendall'}));

var sess;
var pass;

app.post('/login', (req, res, next) => {
  req.session.user = req.body.user;
  req.session.password = req.body.password;

  if(req.session.user == "kendall" && req.session.password == "2812"){
    sess = req.session.user;
    pass = req.session.password;
    console.log(sess);
    res.end('Sesion abierta.');
  }else{
    res.status(401).send({
      menssage: 'Unauthorized'
    });
  }
})

app.get('/logout', function (req, res) {
  console.log(sess);
  req.session.destroy();
  res.end('Sesion destruida.');
});


// Routes
if(sess != "" && pass != ""){
  app.use(require('./routes/productos'));
}else{
  res.status(401).send({
    menssage: 'Unauthorized'
  });
}

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});