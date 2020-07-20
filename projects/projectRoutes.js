const express = require('express');
const Projects = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
    .then(projects=> {
        res.status(200).json(projects);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieinvg the projects',
        })
    })
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(project=> {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'project not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
          message: 'Error retrieinvg the project',
      })
  })
});

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(actions=> {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: 'project not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
          message: 'Error retrieinvg the actions',
      })
  })
});

router.post('/', (req, res)=>{
  Projects.insert(req.body)
  .then(project=>{
    res.status(201).json(project);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
        message: 'Error adding the project',
    })
  })
})

router.delete('/:id', (req, res) => {
  Projects.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The project has been nuked' });
    } else {
      res.status(404).json({ message: 'The project could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the project',
    });
  });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Projects.update(req.params.id, changes)
  .then(project => {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'The project could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the project',
    });
  });
});

module.exports = router;

