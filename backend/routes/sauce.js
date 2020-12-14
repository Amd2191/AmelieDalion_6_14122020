const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.post('/',auth,multer, sauceCtrl.createSauce);

router.put('/:id',auth,multer, sauceCtrl.modifySauce);

router.get('/:id',auth, sauceCtrl.getOneSauce);

router.get('/sauces', sauceCtrl.getAllSauces);
// on ajoute auth, sur toutes les parties que l'on veut protéger
router.delete('/:id', sauceCtrl.deleteSauce );


module.exports = router;