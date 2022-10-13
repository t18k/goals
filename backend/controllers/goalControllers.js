const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
const User = require('../model/userModel')

//  @desc   get all goals
//  @GET   /api/goals/  
//  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ userID: req.user.id })

    res.status(200).json(goals)
})

//  @desc   set one goals
//  @POST   /api/goals/  
//  Private
const setGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.create({
        text: req.body.text,
        userID: req.user.id
    })

    if (!req.body.text) {
        res.status(400).json({ message: 'please add text' })
        // throw new Error('please add text')
    }
    res.status(200).json(goal)
})

//  @desc   update a goal
//  @PUT   /api/goals/:id  
//  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400).json({ message: 'goal not found' })
        return
    }

    // Checking if user Exists
    if (!req.user) {
        res.status(401).json({ message: 'user not found' })
        return
    }
    // Making sure loggedInUser matches goalCreatedUser 
    if (goal.userID.toString() !== req.user.id) {
        res.status(401).json({ message: 'Not authorized' })
        return
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedGoal)
})

//  @desc     delete a goal
//  @DELETE   /api/goals/:id  
//  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    // Checking if user Exists
    if (!req.user) {
        res.status(401).json({ message: 'user not found' })
        return
    }
    // Making sure loggedInUser matches goalCreatedUser 
    if (goal.userID.toString() !== req.user.id) {
        res.status(401).json({ message: 'Not authorized' })
        return
    }

    await goal.delete()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}