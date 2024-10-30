const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  addComment,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware'); // Optional: For protected routes

const router = express.Router();

// Route to create a new task
router.post('/', protect, createTask);

// Route to get all tasks with optional filters (e.g., status, priority, due date)
router.get('/', protect, getTasks);

// Route to update a task by ID (e.g., status, priority)
router.put('/:id', protect, updateTask);

// Route to add a comment to a task by ID
router.put('/:id/comment', protect, addComment);

// Route to delete a task by ID
router.delete('/:id', protect, deleteTask);

module.exports = router;
