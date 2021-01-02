const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

const User = require('../../resources/1_alumno_inscrip/model.alumno');

require('mandatoryenv').load([
  'FACEBOOK_APP_ID',
  'FACEBOOK_APP_SECRET'
]);
const {FACEBOOK_APP_ID, FACEBOOK_APP_SECRET} = process.env;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
 
const PAuthFacebook =new FacebookTokenStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    fbGraphVersion: 'v3.0'
  }, function(accessToken, refreshToken, profile, done) {
      console.log('facebook-token');
      User.findOne({facebookId: profile.id}, function (err, user) {
        //console.log('passport-facebook-token');
        if (err) {return done(err);}
        if (user) {
          return done(null, user);
        }else{
          let newUser = new User();
          newUser.nombre= profile.name.givenName;
          newUser.apellidos= profile.name.familyName;
          newUser.correo = profile.emails[0].value;
          newUser.tipoDeAutenticacion= 'facebook';
          newUser.facebookId = profile.id;
          newUser.imagen = profile.photos[0].value;
          newUser.save(function (err, user){
            return done(null,user);
          });
        }
      });
  }
);

passport.use(PAuthFacebook);