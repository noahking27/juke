"use strict"
import express from "express";
import bodyParser from "body-parser";
import spotify from "./routes/spotifyRoutes/";
import path from "path";

var app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "node_modules")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Add music api here
app.use("/spotify",spotify);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
