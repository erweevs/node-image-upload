const multer = require('multer');
const express = require('express');

const app = express();

// set the multer options
const upload = multer({
    // temp file location: folder in the src directory
    // uncomment this to save the file to the 'documents' folder
    // dest: 'documents',
    // limit file upload size
    limits:{
        // file size in bytes
        fileSize: 1000000 // 1MB
    },
    // set the file upload specifics
    fileFilter(req, file, cb){
        // only allow png, jpg files
        if(!file.originalname.match(/\.(png|jpg)$/)){
            cb(new Error('Please upload a valid file format.'));
        }

        // allow the file upload through
        cb(undefined, true);
    }
});

app.post('/api/upload', upload.single('document'), (req, res) => {
    const fileBytes = req.file.buffer;

    res.sendStatus(200);
}, (error, req, res, next) => {
    res.send(400).send({error: error.message});
});

app.listen(5000, () => {

});