let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))

app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res) => {
  res.send({
    time: req.time
  });
});

app.get("/:word/echo", (req, res) => {
  res.json({
   echo: req.params.word
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use(express.static(__dirname + "/public"));

app.use('/public', express.static(__dirname + "/public"));

app.get("/name", function (req, res) {
  res.json(
    { name: req.query.first + " " + req.query.last}
  );
});

app.post("/name", function (req, res) {
  res.json(
    { name: req.body.first + " " + req.body.last}
  );
  
});


//app.get("/json", function(req, res) {
// res.json(
//   {  "message": "Hello json"  }
//);
//});

app.get("/json", (req, res) => {
  if (process.env["MESSAGE_STYLE"] == "uppercase") {
  res.json(
    {"message": "HELLO JSON"}
  )
  } else {
    res.json(
    {"message": "Hello json"}
  )
    }
});



console.log("Hello World")
