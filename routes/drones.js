const express = require('express')
const router = express.Router()
const Drone = require('../models/Drone.model')

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find()
    .then((foundDrones) => {
      res.render('drones/list', { foundDrones })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here

  res.render('drones/create-form')
})

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here

  const { name, propellers, maxSpeed } = req.body

  Drone.create({ name, propellers, maxSpeed })
    .then((data) => {
      console.log('successfully added new Drone')
      res.redirect('/drones')
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here

  const { id } = req.params

  Drone.findById(id)
    .then((foundMovie) => {
      res.render('drones/update-form', foundMovie)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here

  const {name, propellers, maxSpeed} = req.body
  const { id } = req.params
  
  Drone.findByIdAndUpdate(id, {name, propellers, maxSpeed}).then(()=>{
    res.redirect('/drones')
  }).catch(err => {
    console.log(err)
  })


})

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here

  const {id} = req.params

  Drone.findByIdAndDelete(id).then(() => {
    res.redirect('/drones')
  })
})

module.exports = router
