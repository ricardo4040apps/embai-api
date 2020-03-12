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



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                C R U D
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


router.get("/:name", function (req, res, next) {
  //console.log('tu mama')
  // req.params.fileName ='undefined';
  var src = './store/pictures/' + req.params.fileName + '.png'

  fs.readFile(src, "binary", function (err, data) {
    if (err) {
      console.error('invalid map file')
      res.send(500, err)
      return
    }

    res.writeHead(200, {
      "Content-Type": 'image/png'
    });
    res.write(data, 'binary');
    res.end();
  });
});





router.post('/', type, function (req, res) {
  const tmp_path = req.file.path;
  const hashName = getAvailableName(req.file.originalname);

  var target_path = './store/pictures/' + hashName;

  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);

  src.on('end', function () {
    deleteFile(tmp_path);
    res.status(200).send(hashName)
  });
  src.on('error', function (err) { res.status(500).send(err) });
});


router.delete("/:name", function (req, res, next) {
  //fileCtrl.deleteById(req, res, next);
});






var deleteFile = function (src) {
  fs.unlink(src, function (err) {
    if (err) throw err;
    console.log('File deleted!');
  });
}


var getAvailableName = function (src) {
  console.log(1, src)
  const ext = path.extname(src);
  console.log(2, ext)
  var fileName = src + uuid.v4() + ext;
  if (fs.existsSync(fileName)) {
    getAvailableName(src)
  }
  return fileName
}




module.exports = router;
