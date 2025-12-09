import mongoose, { Schema, Document } from 'mongoose';

export interface IContactSettings extends Document {
  whatsappNumber: string;
  whatsappNumberFormatted: string; // Format display: +62 812-2400-0088
  email: string;
  address: string;
  updatedAt: Date;
}

const ContactSettingsSchema = new Schema<IContactSettings>({
  whatsappNumber: {
    type: String,
    required: true,
    default: '6281224000088' // Format untuk link WA (tanpa +)
  },
  whatsappNumberFormatted: {
    type: String,
    required: true,
    default: '+62 812-2400-0088' // Format untuk display
  },
  email: {
    type: String,
    default: 'info@hawatrans.id'
  },
  address: {
    type: String,
    default: 'Jakarta, Indonesia'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Gunakan singleton pattern untuk model
const ContactSettings = mongoose.models.ContactSettings || mongoose.model<IContactSettings>('ContactSettings', ContactSettingsSchema);

export default ContactSettings;
