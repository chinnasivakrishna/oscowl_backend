const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  basicDescription: {
    type: String,
    required: true,
  },
  totalDescription: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  images: [
    {
      name: String,
      description: String,
      image: String, // URL of the image
    }
  ],
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending'
  },
  startDate: { 
    type: Date, 
    default: Date.now // Automatically sets the current date and time when the project is created
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now // This will hold the timestamp of the last update
  },
  githubLink: {
    type: String, // URL to the GitHub repository
  },
  userId: { // Reference to the user who created the project
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true }); // Automatically creates createdAt and updatedAt fields

module.exports = mongoose.model('Project', projectSchema);
