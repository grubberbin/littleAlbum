var express = require('express');
var router =require('./controller');
var app = express();

app.set('view engine','ejs');

app.use(express.static('./public'));
app.use(express.static('./uploads'));
app.get('/',router.showIndex);
app.get('/up',router.showUp);
app.post('/up',router.doPost);
app.get('/:albumName',router.showAlbum);

app.use(function(req,res){
  res.render("error");
});
app.listen(3000);
