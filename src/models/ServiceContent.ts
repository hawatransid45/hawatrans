import mongoose from 'mongoose';

const ServiceContentSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    enum: ['prosedur', 'interpreter', 'legalization', 'apostille']
  },
  content: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.ServiceContent || mongoose.model('ServiceContent', ServiceContentSchema);
