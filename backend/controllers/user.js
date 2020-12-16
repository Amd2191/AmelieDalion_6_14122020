const bcrypt = require('bcrypt');

const User = require('../models/user');

const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur créé !'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
      // ! permet d'inverser i.e. mettre opposé de la condition 
      // au lieu de si true, est si false avec !
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
                // renvoit un booléen pour savoir si comparaison est bonne ou non
                .then(valid => {
                    if (!valid) {
                      return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    // requête ok et mot de passe ok
                    res.status(200).json({
                        userId: user._id,
                        // Fonction qui prend en premier argument ce que l'on veut encoder, puis la chaîne secrète d'encodage et sa durée
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                          )
                        });
                      })
                // idem uniquement pour les erreurs de serveur
                .catch(error => res.status(500).json({
                    error
                }));
        })
        // uniquement si erreur mais pas si l'utilisateur n'est pas trouvée
        .catch(error => res.status(500).json({error}));
};