var express = require("express");
var router = express.Router();

const fs = require('fs')
const uuid = require('node-uuid');
//const q = require('q')
const multer = require('multer');
const upload = multer({
    dest: './store/pictures/' // this saves your file into a directory called "uploads"
});
var type = upload.single('file');
var path = require('path')

const User = require('../models/user');
const ADS = require('../models/ads');
const Document = require('../models/documentation');



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                ALL FILES
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


router.get("/:name", function(req, res, next) {
    var src = './store/pictures/' + req.params.name

    fs.readFile(src, "binary", function(err, data) {
        if (err) {
            console.error(err)
            res.status(404).send('invalid map file');
            return
        }

        res.writeHead(200);
        res.write(data, 'binary');
        res.end();
    });
});


router.post('/', type, function(req, res) {
    const tmp_path = req.file.path;
    const hashName = getAvailableName(req.file.originalname);

    var target_path = './store/pictures/' + hashName;

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    src.on('end', function() {
        deleteFile(tmp_path);
        res.status(200).send(hashName)
    });
    src.on('error', function(err) { res.status(500).send(err) });
});


router.delete("/:name", function(req, res, next) {
    //fileCtrl.deleteById(req, res, next);
});






/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                PROFILE PICTURES
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

router.get("/picture-profile/:name", function(req, res, next) {
    var src = './store/pictures/' + req.params.name

    fs.readFile(src, "binary", function(err, data) {
        if (err) {
            console.error(err)
            res.status(404).send('invalid map file');
            return
        }

        res.writeHead(200);
        res.write(data, 'binary');
        res.end();
    });
});


router.post('/picture-profile', type, function(req, res) {
    const tmp_path = req.file.path;
    const hashName = getAvailableName(req.file.originalname);


    var target_path = './store/pictures/' + hashName;

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    src.on('end', function() {
        deleteFile(tmp_path);
        updateUserPicture(req.header('userId'), hashName);
        res.status(200).send(hashName)
    });
    src.on('error', function(err) { res.status(500).send(err) });
});








/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                ADS PICTURES
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

router.get("/ads-pictures/:name", function(req, res, next) {
    var src = './store/ads-pictures/' + req.params.name

    fs.readFile(src, "binary", function(err, data) {
        if (err) {
            console.error(err)
            res.status(404).send('invalid map file');
            return
        }

        res.writeHead(200);
        res.write(data, 'binary');
        res.end();
    });
});


router.post('/ads-pictures', type, function(req, res) {
    const tmp_path = req.file.path;
    const hashName = getAvailableName(req.file.originalname);


    var target_path = './store/ads-pictures/' + hashName;

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    src.on('end', function() {
        deleteFile(tmp_path);
        //updateUserPicture(req.header('userId'), hashName);
        updateADSPicture(req.header('ADS_ID'), hashName);
        console.log(hashName)
        res.status(200).send(hashName)
    });
    src.on('error', function(err) { res.status(500).send(err) });
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                DOCUMENTS
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

router.get("/document/:name", function(req, res, next) {
    var src = './store/document/' + req.params.name

    fs.readFile(src, "binary", function(err, data) {
        if (err) {
            console.error(err)
            res.status(404).send('invalid map file');
            return
        }

        res.writeHead(200);
        res.write(data, 'binary');
        res.end();
    });
});


router.post('/document', type, function(req, res) {
    const tmp_path = req.file.path;
    const hashName = getAvailableName(req.file.originalname);


    var target_path = './store/document/' + hashName;

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    src.on('end', function() {
        deleteFile(tmp_path);
        //updateUserPicture(req.header('userId'), hashName);
        updateDocument(req.header('Document_ID'), hashName);
        console.log(hashName)
        res.status(200).send(hashName)
    });
    src.on('error', function(err) { res.status(500).send(err) });
});





router.delete("/:name", function(req, res, next) {
    //fileCtrl.deleteById(req, res, next);
});











var deleteFile = function(src) {
    fs.unlink(src, function(err) {
        if (err) throw err;
        // console.log('File deleted!');
    });
}






// ???? is correct

var getAvailableName = function(src) {
    const ext = path.extname(src);
    var fileName = uuid.v4() + ext;
    if (fs.existsSync(fileName)) {
        getAvailableName(src)
    }
    return fileName
}


var updateUserPicture = function(iserId = null, pictureName) {
    const data = { "picture": pictureName };
    if (iserId) {
        User.update(iserId, data, (err, data) => {
            if (err) {
                console.error("route users put:", err)
                return;
            }
            console.log("Picture Updated!")
        });
    }
}
var updateADSPicture = function(ADSId = null, ADSName) {
    const data = { "picture": ADSName };
    if (ADSId) {
        ADS.update(ADSId, data, (err, data) => {
            if (err) {
                console.error("route ADS put:", err)
                return;
            }
            console.log("Picture Updated!")
        });
    }
}
var updateDocument = function(DocumentId = null, DocumentName) {
    const data = { "document": DocumentName };
    if (DocumentId) {
        Document.update(DocumentId, data, (err, data) => {
            if (err) {
                console.error("route Document put:", err)
                return;
            }
            console.log("Document Updated!")
        });
    }
}


module.exports = router;