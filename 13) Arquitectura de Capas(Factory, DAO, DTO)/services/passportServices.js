const { UsersMongoDAO } = require("../persistencia/daos/usersMongoDAO.js");
const { modelUsers } = require("../persistencia/models/usersMongo.js");
const modelUser = new UsersMongoDAO();

const validExistUser = async (req, email, done) => {
  const userDB = await modelUser.findOne({ email });
  if (userDB) {
    return done(null, false);
  } else {
    const user = new modelUsers();
    for (const key in req.body) {
      user[key] = req.body[key];
    }
    user.save();
    return done(null, user);
  }
  
};

const validCredentials =async(req,email, password,done)=>{
  const userDB = await modelUser.findOne({ email, password });
    if (!userDB) {
     return  done(null, false);
    }
    return done(null, userDB);



}

module.exports = {
  validExistUser,
  validCredentials
};
