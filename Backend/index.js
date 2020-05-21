if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// inicialicacion
const app = express();
require('./database');

// configuraciones
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({ storage }).single('image'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/books', require('./routes/books'));

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

// empezar el servidor
app.listen(app.get('port'), () => {
    console.log('servidor en el puerto', app.get('port'))
})