const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const UserPreferencesSchema = new mongoose.Schema({
  hot: {
    type: String,
    default: ''
  },
  cold: {
    type: String,
    default: ''
  },
  coat: {
    type: Boolean,
    default: false,
  },
  boots: {
    type: Boolean,
    default: false,
  },
  raincoat: {
    type: Boolean,
    default: false,
  },
  rainboots: {
    type: Boolean,
    default: false,
  },
  umbrella: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('UserPreferences', UserPreferencesSchema);
