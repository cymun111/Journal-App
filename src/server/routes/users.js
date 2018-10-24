const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const User = require('../models/user');
const Jentry = require('../models/jentry');
const mongoose = require('mongoose');


//register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

let username = req.body.username;
  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(user){
      return res.json({success: false, msg: "Username already exsits"});
    }

  User.addUser(newUser, (err, user) => {
    console.log(user)
    if(err){
      res.json({success: false, msg:"Failed to Register User"});
    }else{
      res.json({success: true, msg:"User registered"});
      console.log(req.body)

    }
  })
});
});

//authenticate
router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: "User not Found"});
    }

    User.comparePassword(password, user.password, (err, isMatch) =>{
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data:user}, config.secret, {
          expiresIn: 604800 //1 week in seconds
        });

        res.json({
          success: true,
          token: 'jwt '+token,
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email
        })
      }else{
        return res.json({success: false, msg: "wrong Password"});
      }
    });
  });
});
// router.get('/profile/:id', (req, res) => {
//   User.findOne({_id: req.params.id})
//   .then((user) => {res.json(user)});
// });


router.post('/profile', passport.authenticate('jwt', {session:false}), (req, res) => {
  // console.log(req.body)
  var jentry = {user_id: req.user._id, journalEntry: req.body.journalEntry, mood: req.body.mood};
  // console.log(jentry)
  let newEntry = new Jentry(jentry).save().then((jentry) => {
      // console.log(jentry)
    })
  })


router.post('/journalentries', passport.authenticate('jwt', {session:false}), (req, res) => {
  Jentry.find({user_id: req.user.id}, (err, jentry) => {
    console.log(jentry + "this is what your looking for")
    if(err){
      console.log(err);
    }else{
      res.json({
        success: true,
        jentry: jentry
      })
    }
  })
})



module.exports = router;
