var express = require('express');
var router = express.Router();
var userModel = require('../modules/User');
var passCatagoryModel = require('../modules/Password');
var passDetailModel = require('../modules/addPassword');
var bcrpyt = require('bcrypt');
var jwt = require('jsonwebtoken');


if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}





// Global MiddelWare For Checking email  and User In the dataBase

function chckEmail(req,res,next){
  var email = req.body.userEmail;
 var chckExistEmail = userModel.findOne({email:email});
 chckExistEmail.exec(function(err,doc){
   if(err) throw err;
   if(doc){
     return res.render('signup', {
      title: "SignUp Page",err:'',
      msg:"Email Already Exists"
    });
   }
   next();
 });
  
};

function chckUser(req,res,next){
  var user = req.body.username;
  var chckExistsUser = userModel.findOne({username:user});
  chckExistsUser.exec(function(err,doc){
    if(err) throw err;
    if(doc){
      return res.render('signup', {
       title: "SignUp Page",err:'',
       msg:"User Already Exists"
     });
    }
    
  next();
  })
  
  
};


function checkLoginUser(req,res,next){
  var UserToken =  localStorage.getItem('UserToken');
  try {
    jwt.verify(UserToken, 'loginToken');
  } catch(err) {
  return res.redirect('/');
  
  }
  next();
};


/* GET home page. */
router.get('/', function (req, res, next) {
 res.render('index', {
    title: 'Login Page',
    msg:''
  });
});


// Post route for the home page 

router.post('/' ,function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  
  var userDetail = userModel.findOne({username:username});
  
  userDetail.exec(function(err,doc){
if(err) throw err;
  if(doc==null){
    return res.render('index',{
      title: 'Login Page',
      msg:'User Name Not Matched'
    })

  }else if(bcrpyt.compareSync(password,doc.password)){
    var userId = doc.id;
    var token = jwt.sign({ userId: userId }, 'loginToken');
    console.log('Hi');
    localStorage.setItem('UserToken', token);
  

    // Setting Up Local Login USer
    localStorage.setItem('loginUser', username);

    return res.redirect('/dashboard');

  }else{
    return res.render('index',{
      title: 'Login Page',
      msg:'Password Not Matched'
    })
   
  };

});
});






// Signup Route


router.get('/signup',function (req, res) {
  res.render('signup', {
    title: "SignUp Page",err:'',
    msg:""
  });
});


//  SignUp  Post Route For registring New User 
router.post('/signup',chckEmail,chckUser, function (req, res) {

 // Hashing Input Password so we could not get exact password in database

var password = req.body.password;
var cnfrmPassword = req.body.cnfpassword;
console.log(password,cnfrmPassword);
 if(cnfrmPassword!=password){
  res.render('signup', {
    title: "SignUp Page",err:'',
    msg:"Password and Confirm password value are different"
  });
}else{
  // Creating user Object For DataBase
var userDetail = new userModel({
  username:req.body.username,
  email:req.body.userEmail,
  password:bcrpyt.hashSync(req.body.password,10)
})


userDetail.save(function(err,doc){
  if (err) {
   throw err
  }
  res.render('signup', {
    title: "SignUp Page",err:'',
    msg:"Sign Up Succesfully"
  });
})

}







});


//  Dashboard Route 

router.get('/dashboard',checkLoginUser,function(req,res){

var loginUser = localStorage.getItem('loginUser');


  res.render('dashboard',{title:"Dashboard",loginUser:loginUser});
});



// Catagory Route


router.get('/catagory', checkLoginUser,function (req, res) {
  var passCatDetail = passCatagoryModel.find({});
  var loginUser = localStorage.getItem('loginUser');

  passCatDetail.exec(function(err,doc){
    if(err) throw err;
    res.render('password_catag', {
      title: "Catagory  Page",loginUser:loginUser,
      records:doc
    });
  })
  
});


//Add New Catagory Route


router.get('/addcatagory', checkLoginUser,function (req, res) {
  var loginUser = localStorage.getItem('loginUser');
  

  res.render('add_newCatagory', {
    title: "Catagory  Page",loginUser:loginUser,
    msg:''
  });
});

//Add New Catagory  Post Route


router.post('/addcatagory',checkLoginUser, function (req, res) {

  var loginUser = localStorage.getItem('loginUser');
  

var addCat = new passCatagoryModel({
  catagoryName:req.body.passCatagory
})

addCat.save(function(err,doc){
  if (err) throw err;
  res.render('add_newCatagory', {
    title: "Catagory  Page",
    loginUser:loginUser,
    msg:'Catagory Inserted Succesfully! '
  });
})

});

//Add Password Route


router.get('/addpassword', checkLoginUser,function (req, res) {
   
  var passCatDetail = passCatagoryModel.find({});
  var loginUser = localStorage.getItem('loginUser');
  passCatDetail.exec(function(err,doc){
      if(err) throw err;
      // console.log(doc);
      res.render('add-new-password', {
        title: "Catagory  Page",loginUser:loginUser,
        records:doc
      });
    });

    
 
});



router.post('/addpassword',function(req,res){
  
  var catagoryName = req.body.catagory_Name;
  var passDetails = req.body.pass_details
  console.log(catagoryName,passDetails);
  var passChange = new passDetailModel({
    catagoryName:catagoryName,
    passWord_Detail:passDetails
  })
  passChange.save(function(err,doc){
    if(err) throw err;
    res.redirect('/addpassword');
  })
 
});


//View All Password Routes


router.get('/view-all-password',checkLoginUser, function (req, res) {
  var loginUser = localStorage.getItem('loginUser');

  var passDetails = passDetailModel.find({});
  passDetails.exec(function(err,data){
    if(err) throw err;
    res.render('view-all-password', {
      title: "Password View  Page",
      records:'',
      loginUser:loginUser,
      records:data
      
    });
  });

 
});


// Delete Route For Deleting Password Catagory Lists

router.get('/delete/:id',function(req,res){
  console.log(`This Is required Id: `+req.params.id);
  var catDelete = passCatagoryModel.findByIdAndRemove(req.params.id);
    catDelete.exec(function(err,doc){
    if(err) throw err;
    res.redirect('/catagory');

  })
  
});

router.get("/delete/passDetails/:id",function(req,res){
  console.log(`This Is required Id: `+req.params.id);
  var passDetailsDelete = passDetailModel.findByIdAndRemove(req.params.id);
  passDetailsDelete.exec(function(err,doc){
    if(err) throw err;
    res.redirect('/view-all-password');
  });
})



// Update Route For Deleting Password Catagory Lists

router.get('/update/:id',function(req,res){
  var loginUser = localStorage.getItem('loginUser');
  console.log(`This Is required Id: `+req.params.id);
  var passCatDetail = passCatagoryModel.findById(req.params.id);
  passCatDetail.exec(function(err,doc){
    if(err) throw err;
    console.log(doc);
    res.render('updatePassword',{title:"Update Password catagory",loginUser:loginUser,records:doc,msg:''});
  })
  // var catUpdate = passCatagoryModel.findByIdAndUpdate();
  
});





// Post Route to Update the Catagory 
router.post('/update',function(req,res){
  var loginUser = localStorage.getItem('loginUser');
  var id = req.body.id_value;
  var catUpdate = passCatagoryModel.findByIdAndUpdate(id,{catagoryName:req.body.catagoryName});
  catUpdate.exec(function(err,doc){
    if(err) throw err;
    res.redirect('/catagory')
  });
 
});

router.get('/update/passDetails/:id',function(req,res){
  var loginUser = localStorage.getItem('loginUser');
  console.log(`Required Id is : `+req.paramsid);
  var passUpdate = passDetailModel.findById(req.params.id);
  passUpdate.exec(function(err,doc){
    if(err) throw err;
    res.render('updatePasswordDetails',{title:"Update Password Details",loginUser:loginUser,records:doc,msg:''});


  })

})

router.post('/update/passDetails',function(req,res){
  console.log(`Required Id is : `+req.body.PassDetail);
  var id = req.body.id_value;
  var passUpdate = passDetailModel.findByIdAndUpdate(id,{passWord_Detail:req.body.PassDetail});
  passUpdate.exec(function(err,doc){
    res.redirect('/view-all-password');
  })
})


// Route For Logout

router.get('/logout',function(req,res){
 
  localStorage.removeItem('UserToken');
  localStorage.removeItem('loginUser');
  res.redirect('/');
});

module.exports = router;