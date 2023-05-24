const express = require("express");
const Goal = require('../models/goalModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get('/', protect , asyncHandler(async(req, res) => {
    const goals = await Goal.find({user: req.user.id});
    res.json(goals)
}));

router.post('/', protect, asyncHandler(async(req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
      }
      const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
      })
      res.status(200).json(goal)

}));

router.put('/:id', protect, asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        throw new Error('Goal not found')
    }

    if (!req.user) {
        throw new Error('User not found')
    }

    if (goal.user.toString() !== req.user.id) {
        throw new Error('user not authorized')
    }

    const updateGoals = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updateGoals) 
}));

router.delete('/:id',protect, asyncHandler(async(req, res) => {

    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        throw new Error('Goal not found')
    }

    if (!req.user) {
        throw new Error('User not found')
    }

    if (goal.user.toString() !== req.user.id) {
        throw new Error('user not authorized')
    }

    await Goal.deleteOne()
    res.json({id: req.params.id})

}))

module.exports = router;