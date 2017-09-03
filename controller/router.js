var file = require('../models/file.js');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var sd = require('silly-datetime');

exports.showIndex = function(reg, res) {
  file.getAllAlbums(function(err, allAlbums) {
    res.render('index', {
      'albums': allAlbums
    });
  });
};

exports.showAlbum = function(req, res, next) {
  var albumName = req.params.albumName;
  file.getAllImagesByAlbumName(albumName, function(err, ImagesArray) {
    if (err) {
      next();
      return;
    }
    res.render('album', {
      "albumname": albumName,
      "images": ImagesArray
    });
  });
};


exports.showUp = function(req, res) {
  file.getAllAlbums(function(err, albums) {
    res.render('up', {
      'albums': albums
    });
  });
};


exports.doPost = function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.uploadDir = path.normalize(__dirname + "/../tempup/");
  form.parse(req, function(err, fields, files, next) {
    if (err) {
      next();
      return;
    }
    var pic_size = parseInt(files.pic.size);
    if (pic_size > 1024) {
      res.send("图片超大！建议小于1M");
      fs.unlink(files.pic.path);
    }
    var ttt = sd.format(new Date(), "YYYYMMDDHHmmss");
    var ran = parseInt(Math.random() * 8999 + 10000);
    var extname = path.extname(files.pic.name);
    var folder = fields.wenjianjia;
    var oldpath = files.pic.path;
    var newpath = path.normalize(__dirname + "/../uploads/" + folder + '/' + ttt + ran + extname);
    fs.rename(oldpath, newpath, function(err) {
      if (err) {
        console.log('改名失败');
        return;
      }
      res.end("上传成功！");
    });
  });

};
