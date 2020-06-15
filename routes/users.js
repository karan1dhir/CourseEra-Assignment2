var express = require('express');
var router = express.Router();
const bodyparser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
const { authenticate } = require('passport');
var authenticate = require('../authentication');
router.use(bodyparser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.register(new User({
      username: req.body.username,
    }), req.body.password,(err,user)=>{
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-type', 'application/json');
        res.json({err:err});
      } 
      else {
        passport.authenticate('local')(req,res,()=>{
          res.statusCode = 200;
          res.setHeader('Content-type', 'application/json');
          res.json({
            success : true,
            status: 'Registration Successfull',
          });
        });
      }
    });
});

router.post('/login', passport.authenticate('local'),(req, res) => {
  var token = authenticate.getT
  res.statusCode = 200;
  res.setHeader('Content-type', 'application/json');
  res.json({
    success : true,
    status: 'You are Successfully Login !!',
  });
})
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    var err = new Error('Your are not logged In');
    err.status = 403;
    return next(err);
  }
})
module.exports = router;