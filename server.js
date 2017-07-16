const express = require("express"),
bodyParser = require("body-parser");

var path = require("path");
var app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "node_modules")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
