const multer= require('multer');
// CR2ATION DU DICTIONNAIRE DES DIFF2RENTS FORMATS DISPONIBLES
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

const storage = multer.diskStorage({
    // fonction pour dire où stocker
    destination:(req,file,callback)=>{
        // pas d'erreur, le nom du dossier
        callback(null,'images')
    },
    // explique à multer quel nom de fichier utiliser
    filename:(req,file,callback)=>{
        // on sépare les parties à partir d'un espace et on les recolle avec un _
        const name=file.originalname.split(' ').join('_');
        // on récupère le mine type pour générer l'extension du fichier
        const extension = MIME_TYPES[file.mimetype];
        // Por rendre le nom de fichier le plus unique possible on ajoute la date
        callback(null, name + Date.now() + '.'+extension);
    }
});
// single car fichier unique
module.exports=multer({storage}).single('image');