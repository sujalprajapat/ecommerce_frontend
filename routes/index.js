var express = require('express');
var router = express.Router();
var admin = require('../controller/admin');
var user= require('../controller/user')
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage });
/* GET home page. */
router.get('/addadmin',admin.addadmin);
router.post('/adminlogin',admin.adminlogin);
router.get('/adminlogout',admin.adminlogout);
router.get('/addcat',upload.single('image'),admin.addcat);
router.get('/upcat/:id',admin.upcat);
router.get('/delcat/:id',admin.delcat);
router.get('/viewcat',admin.viewcat);
router.get('/addpuzzle',upload.single('puzzle_img'),admin.addpuzzle);
router.get('/viewpuzzle',admin.viewpuzzle);
router.get('/uppuzzle/:id',admin.uppuzzle);
router.get('/registeruser',user.registeruser);
router.post('/loginuser',user.userlogin);
router.get('/logoutuser',user.userlogout);
module.exports = router;
