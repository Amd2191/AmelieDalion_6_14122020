module.exports = (req, res, next) => {
    // Text with no special character
    var regExpText = /([^<>\[\]\\\/;@"])/;
    if (regExpText.test(req.body.sauce.name)) {
        if (regExpText.test(req.body.sauce.manufacturer)) {
            if (regExpText.test(req.body.sauce.description)) {
                if (regExpText.test(req.body.sauce.mainPepper)) {
                    next();
                } else {
                    res.status(400).json({
                        message: 'Saisie invalide, vous ne pouvez pas utiliser les caractères suivants:[]<>/ // ; @ \ \\ " '
                    });
                }
            } else {
                res.status(400).json({
                    message: 'Saisie invalide, vous ne pouvez pas utiliser les caractères suivants:[]<>/ // ; @ \ \\ " '
                });
            }
        } else {
            res.status(400).json({
                message: 'Saisie invalide, vous ne pouvez pas utiliser les caractères suivants:[]<>/ // ; @ \ \\ " '
            });
        }
    } else {
        res.status(400).json({
            message: 'Saisie invalide, vous ne pouvez pas utiliser les caractères suivants:[]<>/ // ; @ \ \\ " '
        });
    }
}