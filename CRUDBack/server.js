const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./routes/api')
const multer = require('multer');

const PORT = 3000

const app = express() // Create instance of express

app.use(bodyParser.json())
app.use('/api', api)
app.use(cors())
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../CoronaProtection/src/assets/images')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
  })

  const upload = multer({ storage: storage })
  app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })

app.get('/', function(req, res){
    res.send('Hello from server')
})

app.listen(PORT, function(){
    console.log('Server running on localhost:' +PORT)
})
