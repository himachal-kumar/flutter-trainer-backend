const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  employeeType: {
    type: String,
    enum: ['Regular', 'Adhoc'],
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  subjects: [
    {
      subject: {
        type: String,
        required: true,
      },
      totalMarks: {
        type: Number, 
        required: true,
      },
      below40: {
        type: Number, 
        required: true,
      },
      from40to60: {
        type: Number, 
        required: true,
      },
      above50: {
        type: Number, 
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Trainer', trainerSchema);
