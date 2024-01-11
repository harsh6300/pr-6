const express = require('express');

const routes = express.Router();


const multer = require('multer') 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const uploadimage = multer({ storage: storage }).single('images');

const usercontrollers = require('../controllers/usercontrollers');

routes.get('/', usercontrollers.signin);
routes.get('/signup', usercontrollers.signup);
routes.post('/sign', usercontrollers.sign);
routes.get('/index', usercontrollers.index);
routes.get('/logout', usercontrollers.logout);

routes.post('/register', usercontrollers.register);

//form data

routes.post('/add',uploadimage,usercontrollers.add);
routes.get('/blog',usercontrollers.blog);
routes.get('/deleterecord',uploadimage,usercontrollers.deleterecord);
routes.get('/editrecord',uploadimage,usercontrollers.editrecord);
routes.get('/edit',usercontrollers.edit);
routes.post('/editform',uploadimage,usercontrollers.editform)


module.exports = routes;