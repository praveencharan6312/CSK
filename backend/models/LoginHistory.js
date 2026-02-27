const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: String,
  loginTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoginHistory', historySchema);
