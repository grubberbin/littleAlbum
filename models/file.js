var fs = require('fs');


exports.getAllAlbums = function(callback) {
  fs.readdir('./uploads', function(err, files) {
    if (err) {
      callback('没有找到', null);
      return;
    }
    var allAlbums = [];

    (function iterator(i) {
      if (i == files.length) {
        console.log(allAlbums);
        callback(null,allAlbums);
        return;
      }
      fs.stat('./uploads/' + files[i], function(err, stats) {
        if (stats.isDirectory()) {
          allAlbums.push(files[i]);
        }
        iterator(i + 1);
      });
    })(0);
  });
};

exports.getAllImagesByAlbumName = function(albumName, callback) {
  fs.readdir('./uploads/' + albumName, function(err, files) {
    if (err) {
      callback('没有找到' + albumName, null);
      return;
    }
    var allImages = [];

    (function iterator(i) {
      if (i == files.length) {
        console.log(allImages);
        callback(null, allImages);
        return;
      }
      fs.stat('./uploads/' + albumName + '/' + files[i], function(err, stats) {
        if (err) {
          callback("找不到" + files[i]);
          return;
        }
        if (stats.isFile()) {
          allImages.push(files[i]);
        }
        iterator(i + 1);
      });
    })(0);
  });

};
