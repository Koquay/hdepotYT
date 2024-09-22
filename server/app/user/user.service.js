require("./user.model");
const User = require("mongoose").model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isEmail = require("validator/lib/isEmail");
const isLength = require("validator/lib/isLength");

exports.signUp = async (req, res) => {
    try {
      const { user } = req.body;
      console.log("user", user);
  
      if (
        !isLength(user.password, {
          min: 6,
        })
      ) {
        return res.status(422).send("Password must be minimum of 6 characters.");
      } else if (!isEmail(user.email)) {
        return res.status(422).send("Invalid email.");
      }
  
      const existingUser = await User.findOne({
        email: user.email,
      });
  
      console.log("existingUser", existingUser);
  
      if (existingUser) {
        return res.status(422).send("User with this credentials already exists.");
      }
  
      let newUser = new User(user);
      newUser.password = bcrypt.hashSync(user.password, 10);
      console.log("newUser", newUser);
      await newUser.save();
      delete newUser.password;
  
      let token = jwt.sign(
        {
          userId: newUser._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      console.log("newUser", newUser);

  
      return res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        token,
        // cart,
      });
    } catch (error) {
      res.status(500).send("Problem signing up user!");
      throw error;
    }
  };


exports.signIn = async (req, res) => {

  const { email, password } = req.body.user;
  console.log("email, password", email, password);

  try {
    let user = await User.findOne({
      email,
    }).select("+password");
    console.log("user", user);

    if (!user) {
      return res.status(422).send("User with this credential does not exist.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log("passwordMatch", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).send("Invalid signin credentials.");
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    const token = jwt.sign(
      {
        userId: user._id
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    console.log("token", token);

    return res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
      // cart,
    });
  } catch (error) {
    res.status(500).send("Problem signing in user!");
    throw error;
  }
};