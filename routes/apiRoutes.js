import apis from "../apis";
var express = require('express')
var router = express.Router()

/*
  * This will take in any music api auth and route to
  * the proper api;
 */
router.post("/apiauth",req,res) => {
  let apiId = req.body.apiId;

};
