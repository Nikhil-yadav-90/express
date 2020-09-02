const express = require('express');
const router = express.Router();
const multer = require('multer');

// Path for the Disk storage of Image 
var path = __dirname+'/../public/uploads';



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname )
    }
  })
   
var upload = multer({storage:storage,
                    limits:{
                        fileSize:1024*1024*5
                    },
                    fileFilter:function(req,file,cb){
                        if(file.mimetype ==='image/jpeg'||file.mimetype ==='image/jpg'||file.mimetype ==='image/png'){
                            cb(null,true);
                        }else{
                            cb(null,false);
                        }
                    }

});

// Controllers
const indexController = require('../api/Controllers/indexController')
const loginController = require('../api/Controllers/loginController');
const catagoryController = require('../api/Controllers/catagoryController');
const passwordController = require('../api/Controllers/passwordController');
const experimentController = require('../api/Controllers/experimentController');
const productController = require('../api/Controllers/productController');
// Data Layers For Buisness Computation 




//  Routes Defination 
router.get('/',indexController);

// Login Details

router.get('/login',loginController.detail);
router.post('/login',loginController.create);
router.delete('/login/:id',loginController.delete);
router.put('/login',loginController.update);



// Catagory Detail

router.get('/catagory',catagoryController.detail);
router.post('/catagory',catagoryController.create);
router.delete('/catagory/:id',catagoryController.delete);
router.put('/catagory',catagoryController.update);

//Password Detail
router.get('/password',passwordController.detail);
router.post('/password',passwordController.create);
router.delete('/password/:id',passwordController.delete);
router.put('/password/',passwordController.update);


// Product Detail 

router.get('/product',productController.detail);
router.post('/product',upload.single('productImage'),productController.create);

// Experiment Api 

router.get('/experiment',experimentController.detail);


module.exports = router;
