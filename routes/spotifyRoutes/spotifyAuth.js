import passport from "passport";
import { Strategy } from "passport-spotify";
import express from "express";
let router = express.Router();
import config from "./spotifyConfig";

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new Strategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken);
      let userInfo = {token:accessToken, refresh: refreshToken, user:profile};
      return done(null, userInfo);
  }
));

router.get('/auth', passport.authenticate('spotify', {scope: ["user-read-private", "user-read-email","user-modify-playback-state","user-read-playback-state","user-read-recently-played"], showDialog: true}));

router.get('/callback', passport.authenticate('spotify', { failureRedirect: '/login' }), (req, res) => {
  // res.cookie("spotifyToken",, { expires: new Date(Date.now() + 36000000), httpOnly: true )
  res.send(req.user);
});

// TODO:
// Need to write a logout which will destory the refresh token, token, and session


export default router;
