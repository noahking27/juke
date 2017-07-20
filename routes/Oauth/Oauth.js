import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
  //This imports FB and Google router configs
import { facebook, google } from './config';
import express from 'express';
let router = express.Router();


router.use(passport.initialize());
router.use(passport.session());

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

//Initialize Passport

//This will set up FB authentication routes
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
    //This redirects user back to router using Linking with OauthLogin
  (req,res) => {

    res.redirect('/auth/test');

  });

router.get('/test' ,(req, res) => {
res.send('this is working');
});
//This will set up Google authentication routes
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
passport.authenticate('google', { failureRedirect: '/auth/google' }),
    (req, res) => {

res.redirect('/auth/test');
});
router.get('/test' ,(req, res) => {

res.send("this is working");
});
export default router;
