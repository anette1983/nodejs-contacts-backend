const { register } = require("./auth");
const { verifyEmail } = require("./auth");
const { login } = require("./auth");
const { getCurrent } = require("./auth");
const { logout } = require("./auth");
const { updateSubscription } = require("./auth");
const { updateAvatar } = require("./auth");
const { resendVerifyEmail } = require("./auth");

module.exports = {
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
};
