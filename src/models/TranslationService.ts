import mongoose from 'mongoose';

const TranslationServiceSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  generalPrice: {
    type: String,
    required: true
  },
  swornPrice: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.TranslationService || mongoose.model('TranslationService', TranslationServiceSchema);
