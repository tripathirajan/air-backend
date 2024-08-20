const { StatusCodes: HttpStatusCode } = require("http-status-codes");
const userModel = require("../models/userModel");

/**
 * login user
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ success: false, message: "Parameter missing!" });
  }
  const userInfo = await userModel.findOne({ email: email });
  if (!userInfo || !userModel.hasPasswordMatched(password)) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      success: false,
      message: "Incorrect email or password!",
    });
  }
  req.session.userId = userInfo._id;

  res.status(HttpStatusCode.OK).json({
    success: true,
    message: "Login Success!",
    result: {
      id: userInfo._id,
      name: userInfo.fullName,
      email: userInfo.email,
    },
  });
};

/**
 * logout user
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) throw err;
      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Logout success!",
      });
    });
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed!",
    });
  }
};

/**
 * register new user
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
const register = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: "Required parameter missing.",
    });
  }
  if (password !== confirmPassword) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: "Password and confirm password didn't match.",
    });
  }
  const isEmailExists = await userModel.findOne({ email });
  if (isEmailExists) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: "Email already registered",
    });
  }

  const newUser = await userModel.create({ fullName, email, password });
  if (!newUser) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!",
    });
  }
  req.session.userId = newUser._id;

  return res.status(HttpStatusCode.OK).json({
    success: true,
    message: "Success!",
    result: {
      id: newUser._id,
      name: newUser.fullName,
      email: newUser.email,
    },
  });
};
module.exports = {
  login,
  logout,
  register,
};
