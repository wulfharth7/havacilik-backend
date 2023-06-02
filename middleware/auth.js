// FORMAT OF TOKEN
// Authorization: <access_token>

const verifyToken= async function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
module.exports = verifyToken;