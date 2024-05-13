const { loginUser, registerUser } = require("../services/authService");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password." });
    }
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (e) {
    next(e);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password." });
    }

    if (
      password.length < 8 ||
      !/\d/.test(password) ||
      !/[a-zA-Z]/.test(password)
    ) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include both letters and numbers.",
      });
    }

    const token = await registerUser(email, password);
    res.status(201).json({ token });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  login,
  register,
};
