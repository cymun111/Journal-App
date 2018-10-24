const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


//Journal Entry Schema
const JentrySchema =  mongoose.Schema({
  user_id: String,
  journalEntry: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    required: true
  }
});
const Jentry = module.exports = mongoose.model('Jentry', JentrySchema);
