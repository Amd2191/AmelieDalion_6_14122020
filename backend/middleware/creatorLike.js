const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.sauce.userId == userId) {
        console.log('oui');
        res.status(403).json({error: error |'Cette sauce est votre création, vous ne pouvez donc pas la liker ou disliker'})
    } else {
        next();
    }
  } catch {
    res.status(400).json({error: new Error ('Requête erronée')});
  }
};