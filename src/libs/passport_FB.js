const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');

const User = require('../resources/1_alumno_inscrip/model.alumno');
const { facebook } = require('../config/passport_FB_config');

const PAuthFace = new FacebookStrategy({
    clientID: facebook.FACEBOOK_APP_ID,
    clientSecret: facebook.FACEBOOK_APP_SECRET,
    callbackURL: '/api/alumno/access/callback'
},
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({provider_id: profile.id}, function (err, user) {
            //1.- Error
            if (err) { return done(err); };
            //2.- Si existe en la Base de Datos, lo devuelve
			if(!err && user!= null) return done(null, user);
            //3.-  Si no existe crea un nuevo objecto usuario
            console.log('Creating', profile)
			var user = new User({
				provider_id: profile.id,
				provider: profile.provider,
				name: profile.displayName,
				photo: profile.photos[0].value
			});
			//...y lo almacena en la base de datos
			user.save(function(err) {
				if(err) throw err;
				done(null, user);
			});
            done(null, user);
        });
    });

// incluye en passport el uso de la estrategia de JWT
passport.use(PAuthFace);
