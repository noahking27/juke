//const SpotifyStrategy = require('passport-spotify').Strategy;
import SpotifyStrategy, {Strategy} from "passport-spotify";
import config from "./spotifyConfig";

passport.use(new SpotifyStrategy({
    clientID: config.client_id,
    clientSecret: config.client_secret,
    callbackURL: config.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
