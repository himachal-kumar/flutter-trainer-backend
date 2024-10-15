const express = require('express');
const router = express.Router();
const Trainer = require('../models/trainerModel');

// POST request to create a new trainer
router.post('/', async (req, res) => {
  try {
    const trainer = new Trainer(req.body);
    await trainer.save();
    res.status(201).send(trainer);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET request to retrieve all trainers
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).send(trainers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:email', async (req, res) => {
  const { email } = req.params;
  const { subject, updatedData } = req.body;

  // Debugging logs
  console.log('Updating subject:', subject);
  console.log('Updated data:', updatedData);

  try {
    const trainer = await Trainer.findOne({ email });
    if (!trainer) {
      return res.status(404).send({ error: 'Trainer not found' });
    }

    const subjectIndex = trainer.subjects.findIndex(sub => sub.subject === subject);
    if (subjectIndex === -1) {
      return res.status(404).send({ error: 'Subject not found' });
    }

    // Update the specific subject with the new data, ensure to include the `subject` field
    trainer.subjects[subjectIndex] = {
      subject, // Add the subject field here
      ...updatedData,
    };

    await trainer.save();
    res.status(200).send({ message: 'Subject updated successfully', trainer });
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).send({ error: 'Failed to update subject' });
  }
});



// DELETE request to delete a trainer by ID
router.delete('/:id', async (req, res) => {
  try {
    const trainerId = req.params.id;
    const deletedTrainer = await Trainer.findByIdAndDelete(trainerId);
    
    if (!deletedTrainer) {
      return res.status(404).send({ error: 'Trainer not found' });
    }
    
    res.status(200).send({ message: 'Trainer deleted successfully', trainer: deletedTrainer });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete trainer' });
  }
});

module.exports = router;
