const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const trainerRouter = require('./routes/trainers'); // Make sure to update the path based on your project structure
const cors = require('cors');
const trainerModel = require('./models/trainerModel.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cors());


app.use('/api/trainers', trainerRouter); // Route for trainer data
app.get("/hello", (req, res) => {
  res.send("hello");
  console.log("Hello");
})
app.get("/api/subjects/:id", async (req, res) => {
  console.log("Hiuii");
  console.log(req.params);

  const currentTrainer = await trainerModel.findOne({ email : req.params.id });

  res.status(200).json({currentTrainer});
})

// MongoDB Connection 
mongoose.connect('mongodb://localhost:27017/Trainer_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true, // You can remove this line
})
.then(() => {
  console.log('MongoDB connected successfully.');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
