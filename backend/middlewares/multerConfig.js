const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuração do multer para armazenar arquivos
const storage = multer.diskStorage({
    destination: function (cb) {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir); // Define o diretório para onde os arquivos serão enviados
    },
    filename: function (cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Define o nome do arquivo
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limita o tamanho do arquivo a 5MB
  });
  

module.exports = upload;
