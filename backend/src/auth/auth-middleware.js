const jwt = require("jsonwebtoken");

function doAuthMiddleware(req, res, next) {
  const token = req.headers.token;
  console.log("hallo token", token);

  try {
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.OrderClaims = tokenPayload;
    console.log(req.OrderClaims);
    next();
  } catch (err) {
    console.log("error while verifying token:", err);
    return res.status(401).json({ message: "please login first" });
  }
}

module.exports = {
  doAuthMiddleware,
};
