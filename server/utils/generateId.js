const crypto = require("crypto");

function generateId(prefix = "c_") {
  return prefix + crypto.randomBytes(2).toString("hex");
}

module.exports = generateId;
