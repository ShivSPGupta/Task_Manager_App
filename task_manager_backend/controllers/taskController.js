const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tasks (with optional filters)
exports.getTasks = async (req, res) => {
  const { status, priority, dueDate } = req.query;
  let filter = {};

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (dueDate) filter.dueDate = { $lte: new Date(dueDate) };

  try {
    const tasks = await Task.find(filter).populate('assignedTo', 'username email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update task by ID (status, priority, comments, etc.)
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add a comment to a task
exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { user, text } = req.body;
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.comments.push({ user, text });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
