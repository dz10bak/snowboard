const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  shape: {
    type: String,
    required: true,
    enum: ['twin', 'directional', 'directional-twin', 'swallowtail'],
  },
  ridingStyle: {
    type: String,
    required: true,
    enum: ['park', 'all-mountain', 'freeride'],
  },
  graphicStyle: {
    type: String,
    required: true,
    enum: ['minimal', 'graffiti', 'japanese', 'cyberpunk', 'vintage', 'brutal-black'],
  },
  customText: {
    type: String,
    default: '',
    maxlength: 200,
  },
  prompt: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

designSchema.index({ createdAt: -1 });
designSchema.index({ featured: 1, createdAt: -1 });
designSchema.index({ likes: -1 });

module.exports = mongoose.model('Design', designSchema);
