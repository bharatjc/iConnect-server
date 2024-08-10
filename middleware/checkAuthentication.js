const jwt = require("jsonwebtoken");

function checkAuthentication(req, res, next) {
  try {
    let token = req.headers.authorization.replace("Bearer ", "");
    const JWT_SECRET_KEY = "chhhup";
    let decoded = jwt.verify(token, JWT_SECRET_KEY);
    let user = decoded;
    req.user = user;
    next();
  } catch (err) {
    console.log("Error", err);
    return res.status(400).send({
      msg: "unauthenticated",
    });
  }
}

function isSeller(req, res, next) {
  if (req.user.role == "seller") {
    next();
  } else {
    res.status(403).send({
      msg: "Access denied: only for seller",
    });
  }
}

function isBuyer(req, res, next) {
  if (req.body.role == "buyer") {
    res.send("This is buyer only page.");
    next();
  } else {
    res.status(403).send({
      msg: "Access denied: only for buyer",
    });
  }
}

module.exports = { checkAuthentication, isSeller, isBuyer };
