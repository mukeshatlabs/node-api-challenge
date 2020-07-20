const express = require('express');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
    .then(actions=> {
        res.status(200).json(actions);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieinvg the actions',
        })
    })
});

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(action=> {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: 'action not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
          message: 'Error retrieinvg the action',
      })
  })
});

router.post('/', (req, res)=>{
  Actions.insert(req.body)
  .then(action=>{
    res.status(201).json(action);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
        message: 'Error adding the action',
    })
  })
})

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The action has been nuked' });
    } else {
      res.status(404).json({ message: 'The action could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the action',
    });
  });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Actions.update(req.params.id, changes)
  .then(action => {
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: 'The action could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the action',
    });
  });
});

module.exports = router;

