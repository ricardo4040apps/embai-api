var express = require("express");
var router = express.Router();

const fs = require('fs')
const uuid = require('node-uuid');
//const q = require('q')
const multer = require('multer');
const upload = multer({
    dest: './store/pictures/profile/' // this saves your file into a directory called "uploads"
});
var type = upload.single('file');
var path = require('path')

const User = require('../models/user');
const ADS = require('../models/ads');
const Document = require('../models/documentation');



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                ALL FILES
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// is this used???
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

// is this used???
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

// is this used ???
router.delete("/:name", function(req, res, next) {
    //fileCtrl.deleteById(req, res, next);
});






/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                PROFILE PICTURES
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
const uploadPictureProfile = multer({
    dest: './store/pictures/profile/' // this saves your file into a directory called "uploads"
});
var typePictureProfile = uploadPictureProfile.single('file');


router.get("/picture-profile/:name", function(req, res, next) {
    var src = './store/pictures/profile/' + req.params.name

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


router.post('/picture-profile', typePictureProfile, function(req, res) {
    const tmp_path = req.file.path;
    const hashName = getAvailableName(req.file.originalname);

    var target_path = './store/pictures/profile/' + hashName;

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



var updateUserPicture = function(userId = null, pictureName) {
    const data = { "picture": pictureName };
    if (userId) {
        User.update(userId, data, (err, data) => {
            if (err) {
                console.error("route users put:", err)
                return;
            }
            console.log("Picture Updated!")
        });
    }
}




/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                ADS PICTURES
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

router.get("/ads-pictures/:name", function(req, res, next) {
    var src = './store/pictures/ads/' + req.params.name
    console.log(111, src)
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


    var target_path = './store/pictures/ads/' + hashName;

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    src.on('end', function() {
        deleteFile(tmp_path);
        //updateUserPicture(req.header('userId'), hashName);
        updateADSPicture(req.header('ADS_ID'), hashName);
        console.log(hashName)
        res.status(200).send({ fileName: hashName })
    });
    src.on('error', function(err) { res.status(500).send(err) });
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                DOCUMENTS
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

router.get("/document-profile/:name", function(req, res, next) {
    var src = './store/documents/' + req.params.name

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


    var target_path = './store/documents/' + hashName;

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    src.on('end', function() {
        deleteFile(tmp_path);
        //updateUserPicture(req.header('userId'), hashName);
        updateDocument(req.header('Document_ID'), hashName);
        console.log(hashName)
        res.status(200).send({ fileName: hashName })
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


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                TICKETS
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

router.get("/tickets-valuate/:name", function(req, res, next) {
    var src = './store/tickets/' + req.params.name;

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


router.post('/ticket', type, function(req, res) {
    const tmp_path = req.file.path;
    const hashName = getAvailableName(req.file.originalname);
    var target_path = './store/tickets/' + hashName;

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    src.on('end', function() {
        deleteTicket(tmp_path);
        //updateUserPicture(req.header('userId'), hashName);
        updateTicket(req.header('ticketId'), hashName);
        console.log(hashName)
        res.status(200).send({ fileName: hashName })
    });
    src.on('error', function(err) { res.status(500).send(err) });
});


router.delete("/:name", function(req, res, next) {
    //fileCtrl.deleteById(req, res, next);
});


var deleteTicket = function(src) {
    fs.unlink(src, function(err) {
        if (err) throw err;
        // console.log('File deleted!');
    });
}

//NOMBRE

// ???? is correct

var getAvailableName = function(src) {
    const ext = path.extname(src);
    var fileName = uuid.v4() + ext;
    if (fs.existsSync(fileName)) {
        getAvailableName(src)
    }
    return fileName
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

var updateTicket = function(TicketId = null, TicketName) {
    const data = { "ticket": TicketName };
    if (TicketId) {
        Document.update(TicketId, data, (err, data) => {
            if (err) {
                console.error("route Ticket put:", err)
                return;
            }
            console.log("Document Ticket!")
        });
    }
}


module.exports = router;