const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const { title, basicDescription, totalDescription, client, budget, images } = req.body;

  try {
    const newProject = new Project({
      title,
      basicDescription,
      totalDescription,
      client,
      budget,
      images,
      userId: req.user._id, // Associate project with the logged-in user
    });

    await newProject.save();
    res.status(201).send(newProject);
  } catch (error) {
    res.status(500).send({ message: 'Error creating project' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id });
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching projects' });
  }
};



// Update project status and store GitHub link
exports.updateProjectStatus = async (req, res) => {
  const { status, githubLink } = req.body;
  const projectId = req.params.id;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        status,
        githubLink, // Store GitHub link
        lastUpdated: Date.now(),
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).send({ message: 'Project not found' });
    }

    res.status(200).send(updatedProject); // Send the updated project back
  } catch (error) {
    res.status(500).send({ message: 'Error updating project status' });
  }
};


exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findByIdAndDelete(projectId);
    
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }

    res.status(200).send({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting project' });
  }
};
