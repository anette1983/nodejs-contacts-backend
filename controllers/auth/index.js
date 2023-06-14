const { register } = require("./auth");
const { login } = require("./auth");
const { getCurrent } = require("./auth");
const { logout } = require("./auth");
const { updateSubscription } = require("./auth");
const { updateAvatar } = require("./auth");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
};
