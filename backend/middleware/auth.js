const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // on vérifie le token en donnant la clé secrète, quand on décode,
    // il devient un objet javascript
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'user ID non valable';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: error |'Requête non authentifiée'});
  }
};