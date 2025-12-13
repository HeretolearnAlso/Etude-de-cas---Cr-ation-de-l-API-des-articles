const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../api/users/users.model"); // Assurez-vous d'importer le modèle User

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "no token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);
    
    // Récupération de l'utilisateur complet depuis la base de données
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      throw "user not found";
    }
    
    // Stockage de l'utilisateur complet dans req
    req.user = user;
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
