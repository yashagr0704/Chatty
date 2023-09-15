const User = require("../model/userModel");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userNamecheck = await User.findOne({ username });
    if (userNamecheck) {
      return res.json({ msg: "Username already present.", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email is already present.", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (e) {
    next(e);
  }
};
module.exports.login = async (req, resp, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return resp.json({ msg: "Incorrect username/password.", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return resp.json({ msg: "Incorrect username/password.", status: false });
    delete user.password;
    return resp.json({ status: true, user });
  } catch (e) {
    next(e);
  }
};

module.exports.getAllUsers = async (req, resp, next) => {
  try{
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "_id",
    ]);
    return resp.json(users);
  }
  catch(e){
    next(e);
  }

};
