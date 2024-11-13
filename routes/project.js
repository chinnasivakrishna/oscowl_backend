const express = require('express');
const { createProject, getProjects, updateProjectStatus, deleteProject } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/project', authMiddleware, createProject);
router.get('/projects', authMiddleware, getProjects);
router.put('/project/:id/status', authMiddleware, updateProjectStatus);
router.delete('/project/:id', authMiddleware, deleteProject);

module.exports = router;
