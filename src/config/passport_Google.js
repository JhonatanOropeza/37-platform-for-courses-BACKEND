const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;

const User = require('../resources/1_alumno_inscrip/model.alumno');

require('mandatoryenv').load(['GOOGLE_CLIENT_ID','GOOGLE_CLIENT_SECRET']);
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleTokenStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET
  },
  function(accessToken, refreshToken, profile, done) {
    
      User.findOne({googleId: profile.id}, function (err, user) {
        //console.log('passport-google-token');
        if (err) {return done(err);}
        if (user) {
          return done(null, user);
        }else{
          let newUser = new User();
          newUser.googleId = profile.id;
          newUser.nombre= profile.name.givenName;
          newUser.apellidos= profile.name.familyName;
          newUser.correo = profile.emails[0].value;
          newUser.tipoDeAutenticacion= 'google';
          newUser.imagen = profile._json.picture
          newUser.save(function (err, user){
            return done(null,user);
          });
        }
      });
  }
));