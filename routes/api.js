const express = require('express');
const router = express.Router();

// Controllers
const indexController = require('../api/Controllers/indexController')
const loginController = require('../api/Controllers/loginController');
const catagoryController = require('../api/Controllers/catagoryController');
const passwordController = require('../api/Controllers/passwordController');
const experimentController = require('../api/Controllers/experimentController');
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



// Experiment Api 

router.get('/experiment',experimentController.detail);

module.exports = router;
