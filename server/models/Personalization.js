const mongoose = require('mongoose');

const personalizationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipientName: {
    type: String,
    required: true,
    trim: true
  },
  customMessages: [{
    day: {
      type: Number,
      min: 1,
      max: 25,
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    }
  }],
  customPhotos: [{
    day: {
      type: Number,
      min: 1,
      max: 25
    },
    imageData: {
      type: String,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Personalization', personalizationSchema);
