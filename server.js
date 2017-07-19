  //This imports the dependencies
import express from 'express';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
  //This imports FB and Google app configs
import { facebook, google } from './config';
  //This changes FB profile into user object
const transformFacebookProfile = (profile) => ({
  name: profile.name,
  avatar: profile.picture.data.url,
});
  //This changes google profile into user object
const transformGoogleProfile = (profile) => ({
  name: profile.displayName,
  avatar: profile.image.url,
});
  //This will register the Facebook Passport Strategy
passport.use(new FacebookStrategy(facebook,
  // This gets called when a user authorizes access to their profile
   async (accesstoken, refreshToken, profile, done)
 // This returns done callback and passes transformed user object
    => done(null, transformFacebookProfile(profile._json))
));
// This will register the Google Passport Strategy
passport.use(new GoogleStrategy(google,
  async (accessToken, profile, done)
    => done(null, transformGoogleProfile(profile._json))
));

//Serialize user into the sessions (required for passport)
passport.serializeUser((user, done) => done(null, user));

//Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));

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
    (req,res) =>redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));

//This will set up Google authentication routes
app.get('auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
    (req, res) =>redirect('OAuthLogin://login?user' + JSON.stringify(req.user)));


//This launches the server on port 4000

const server = app.listen(4000, () => {
  const { address, port } = server.address();
  console.log(`Server is listening at http://${address}:${port}`);
});
