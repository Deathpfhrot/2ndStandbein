const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function hash(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function createRandomSalt() {
  return crypto.randomBytes(64).toString("hex");
}

function createPasswordHash(password, salt) {
  return hash(password + salt);
}

function createToken(order) {
  const TEN_MINUTES = 60 * 10; // 60seconds x 10
  const initiatedAt = Math.floor(Date.now() / 1000);
  console.log(initiatedAt);
  const expiresAt = initiatedAt + TEN_MINUTES;

  const tokenPayload = {
    sub: order._id, // subjekt
    tokenType: "access",
    iat: initiatedAt, // initiated at in seconds
    exp: expiresAt, //expires
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
  return token;
}

module.exports = {
  hash,
  createRandomSalt,
  createToken,
  createPasswordHash,
};
