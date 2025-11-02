const ensureAuthenticated = (req, res, next) => {
  const auth = res.headers["autherisation"];
  if (!auth) {
    return res
      .status(403)
      .json({ message: "unauthorised,jwt token is required" });
  }
  try {
    const decoded = JsonWebTokenError.verify(auth, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "unauthorised,jwt token is wrong" });
  }
};
module.exports = {ensureAuthenticated}