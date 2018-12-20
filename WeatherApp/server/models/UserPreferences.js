const mongoose = require('mongoose');

const UserPreferencesSchema = new mongoose.Schema({
  prefId: {
    type: String,
    default: '',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  hot: {
    type: String,
    default: ''
  },
  cold: {
    type: String,
    default: '',
  },
  coat: {
    type: Boolean,
    default: false,
  },
  lightCoat: {
    type: Boolean,
    default: false,
  },
  boots: {
    type: Boolean,
    default: false,
  },
  hat: {
    type: Boolean,
    default: false,
  },
  scarf: {
    type: Boolean,
    default: false,
  },
  gloves: {
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
  sunglasses: {
    type: Boolean,
    default: false,
  },
  lightClothes: {
    type: Boolean,
    default: false,
  },
  sandals: {
    type: Boolean,
    default: false,
  },
  sunhat: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('UserPreferences', UserPreferencesSchema);
