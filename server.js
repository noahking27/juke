
"use strict"
import express from "express";
import bodyParser from "body-parser";
import spotify from "./routes/spotifyRoutes/";
import path from "path";
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
  //This imports FB and Google app configs
import { facebook, google } from './config';
var app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "node_modules")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Add music api here
app.use("/spotify",spotify);

  //This will register the Facebook Passport Strategy
passport.use(new FacebookStrategy(facebook,
  // This gets called when a user authorizes access to their profile
   (accesstoken, refreshToken, profile, done)=>{
 // This returns done callback and passes transformed user object
    done(null, profile)
  }
));
// This will register the Google Passport Strategy
passport.use(new GoogleStrategy(google,
  (accessToken, refreshToken, profile, done)=>{
   done(null, profile)
 }
));

//Serialize user into the sessions (required for passport)
passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user)
});

//Deserialize user from the sessions
passport.deserializeUser((user, done) => {
  done(null, user)
});

//Initialize the server
const app = express();

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//This will set up FB authentication routes
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
      //This redirects user back to app using Linking with OauthLogin
    (req,res) => {

      res.redirect('/test');

    });

app.get('/test' ,(req, res) => {
  res.send('this is working');
});
//This will set up Google authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
      (req, res) => {

res.redirect('/test');
});
app.get('/test' ,(req, res) => {

res.send("this is working");
});
//This launches the server on port 4000

const server = app.listen(4000, () => {
  const { address, port } = server.address();
  console.log(`Server is listening at http://${address}:${port}`);
});
