const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { register, login } = require("../controller/pasportController.js");
const { modelUsers } = require("../persistencia/models/usersMongo.js");


passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    }, register
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },login
  )
);

// Serializar debe de almacenar solamente el id para poder luego hacer la recuperacion de este id.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializar debe de ir a buscar el id en la base de datos para recupararlo.
passport.deserializeUser(async (id, done) => {
  const userDB = await modelUsers.findById(id);
  done(null, userDB);
});
