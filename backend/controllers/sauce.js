const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        // protocole nom d'hote image et nom du fichier
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({
            message: 'Objet enregistré !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

// pour pouvoir gérer le téléchargement de l'image il faut gérer les deux situations:
exports.modifySauce = (req, res, next) => {
    // savoir s'il y a déjà un fichier image
    const sauceObject = req.file ?
        // S'il existe type objet A et s'il n'existe pas type ojet B
        {
            // on récupère et modifie l'URL
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            ...req.body
        };
    Sauce.updateOne({
            _id: req.params.id
        }, {
            ...sauceObject,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Objet modifié !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};



exports.deleteSauce = (req, res, next) => {
    // trouver le produit à supprimer
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => {
            //  récupère l'url on sépare autour de /im/ dans tableau,
            // on prend donc le deuxième élément du tableau pour avoir le nom du fichier
            const filename = sauce.imageUrl.split('/images/')[1];
            // unlink permet de supprimer le fichier,
            // argument 1 est le chemin du fichier
            // argument 2 est le callbakc i.e. quoi faire une fois le fichier supprimer

            fs.unlink(`images/${filename}`, () => {

                Sauce.deleteOne({
                        _id: req.params.id
                    })
                    .then(() => res.status(200).json({
                        message: 'Objet supprimé !'
                    }))
                    .catch(error => res.status(400).json({
                        error
                    }));
            });
        })
        .catch(error => res.status(500).json({
            error
        }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({
            error
        }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => {
            const sauceUsersLikes = sauce.usersLikes;
            const sauceUsersDislikes = sauce.usersDislikes;
            const userLike = req.body.like;
            const userId = req.body.userId;
            if (userLike === -1 & sauceUsersDislikes.indexof(userId) > 0) {
                res.status(403).json({
                    error: error | "Vous avez déjà indiqué que vous n'aimiez pas cette sauce"
                })
            }
            if (userLike === -1 & sauceUsersDislikes.indexof(userId) < 0) {
                sauce.likes -= 1;
                sauceUsersDislikes.push(req.body.userId);
                res.status(201).json({message:"C'est noté!"});
            }
            if (userLike === 1 & sauceUsersLikes.indexof(userId) > 0) {
                res.status(403).json({
                    error: error | "Vous avez déjà indiqué que vous aimiez cette sauce"
                })
            }
            if (userLike === 1 & sauceUsersLikes.indexof(userId) < 0) {
                sauce.likes =+ 1;
                sauceUsersLikes.push(req.body.userId);
                res.status(201).json({message:"C'est noté!"});
            }
        })
        .catch(error => res.status(404).json({
            error
        }));
};