import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide Name'],
    trim: true,
  },
  points: {
    type: Number,
    required: [true, 'Please provide points'],
  },
});

export default mongoose.models.Entry || mongoose.model('Entry', EntrySchema);
