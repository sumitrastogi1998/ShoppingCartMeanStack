const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const ItemsList = require('../models/file')
var nodemailer = require('nodemailer');
const multer = require('multer');

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_password'
    }
  });
  const db=`connection string of your mongodb database`

mongoose.connect(db, (err) => {
    if (err) {
        console.error('Error!' + err)
    }
    else {
        console.log("Connected to mongodb")
    }
}
)
const DIR = './uploads/'
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, DIR)
    },
    filename: (req, file, callBack) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callBack(null, fileName)
    }
  })

  const upload = multer({ storage: storage })

  router.post('/add-item', upload.single('avatar'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const newItem = new ItemsList({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      avatar: url + '/uploads/' + req.file.filename,
      price: req.body.price
    });
    newItem.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: "Item added successfully!",
        itemAdded: {
          _id: result._id,
          name: result.name,
          avatar: result.avatar,
          price: result.price
        }
      })
    }).catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    })
  })

  router.get("/getAllItems", (req, res, next) => {
    ItemsList.find().then(data => {
      res.status(200).json({
        message: "List Of Items retrieved successfully!",
        users: data
      });
    });
  });


router.post('/register-user',(req, res)=>{
    var mailOptions = {
        from: 'your_email@gmail.com',
        to: req.body.userName,
        subject: 'Email Regarding Login',
        text: `You have successfully registered in Corona Prevention App \n I have generated a token for you for further login \n Your token is:  ${req.body.uniqueToken} and password is ${req.body.password}`
      };
    let userData = req.body
    let user = new User(userData)
    
     user.save((error, registeredUser)=>{
         if(error){
             console.log(error)
             res.status(200).send('Email Id already registered');
         }
         else{
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log("Error from sendMail"+error);
                } else {
                    console.log("from info mail"+JSON.stringify(info))
                  res.status(200).send(info);
             res.status(200).send(registeredUser)
                }
              });
         }
     })
    
})



router.post('/mailToAdmin',(req, res)=>{
    var mailOptions = {
        from: req.body.fromMailId,
        to: 'your_email@gmail.com',
        subject: 'Suggestion Email from User',
        text: req.body.suggestion
      };
    let userData = req.body
    
     
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log("Error from sendMail"+error);
                } else {
                    console.log("from info mail"+JSON.stringify(info))
                  res.status(200).send(info);
             res.status(200).send(userData)
                }
              });
         }
     
    
)

router.post('/login-user', (req, res) => {
    let userData = req.body
    User.findOne({ uniqueToken: userData.uniqueToken }, (error, user) => {
        if (error) {
            console.log(error)
            res.status(200).send(error)
        }
        else {
            if (!user) {
                res.status(200).send('Invalid token')
            }
            else if (user.password != userData.password) {
                res.status(200).send('Invalid Password')
            }
            else {
                
                res.status(200).send(user)
            }
        }
    })
})
router.delete('/:_id',(req, res)=>{
    var id = req.params._id
    User.findOneAndRemove({email: id}, (err,deleteUser)=>{
        if(err){
            console.log('error removing')
        }
        else{
            res.status(200).send(deleteUser)
        }
    })
    // User.findByIdAndRemove(id, (err,deletedUser)=>{
    //     if(err){
    //         console.log("error deleting: "+JSON.stringify(err,undefined,2))
    //     }
    //     else{
    //         res.status(200).send(deletedUser)
    //     }
    // })
})

router.put('/update/:email',(req,res)=>{

    let user = {
        email: req.body.email,
        password: req.body.password
    }
    User.findOneAndUpdate({email:req.body.email},{$set: user}, (err, updateUser)=>{
        if(err){
            console.log("Error updating")
        }else{
            res.status(200).send(updateUser)
        }
    })
    
})

router.get('/get-userData',(req, res)=>{
    User.find({},(err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

router.get('/get-userData/:_id',(req, res)=>{
    User.findById(req.params._id,(err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})


router.get('/', (req, res) => {
    res.send('From API route')
})

module.exports = router
