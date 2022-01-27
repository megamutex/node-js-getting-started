const express = require('express');
const path = require('path');
const multer  = require("multer");
const PORT = process.env.PORT || 5000;
let app = express();

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// app.get('/addFile', function (req, res) {
//   try {
//     reid()
//     res.send(JSON.stringify({
//       created: 'success'
//     }))
//   } catch (erorr) {
//     res.send(JSON.stringify({
//       created: 'failed'
//     }))
//   }
// });

// function reid() {
//   var fs = require('fs')
//   fs.mkdirSync('New')
// }
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, path.join(__dirname, 'public') + "/uploads");
  },
  filename: (req, file, cb) =>{
      cb(null, file.originalname);
  }
});
// определение фильтра
const fileFilter = (req, file, cb) => {

  if(file.mimetype === "application/json"){
      cb(null, true);
  }
  else{
      cb(null, false);
  }
}
app.use(multer({storage:storageConfig, fileFilter: fileFilter}).single("filedata"));
app.post("/upload", function (req, res, next) {
   
    let filedata = req.file;
 
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});