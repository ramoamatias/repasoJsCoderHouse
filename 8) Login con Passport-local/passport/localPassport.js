const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { modelUsers } = require("../persistencia/models/usersMongo.js");


passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const userDB = await modelUsers.findOne({ email });
      console.log(userDB,"USUARIO RECUPERADO EN REGISTER");
      if (userDB) {
        return done(null, false);
      } else {
        const user = new modelUsers();
        for (const key in req.body) {
            user[key] = req.body[key];
          }
        console.log("USUARIO",user);
        user.save();
        done(null, user);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const userDB = await modelUsers.findOne({ email, password });
      console.log(userDB,"USuARIO RECUPERADO EN LOGIN");
      if (!userDB) {
        done(null, false);
      }
      done(null,userDB);
    }
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
