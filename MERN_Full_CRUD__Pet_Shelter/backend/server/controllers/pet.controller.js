const Pet = require('../models/pet.model');

module.exports.createPet = (req,res) => {
    Pet.create(req.body)
    .then(results => res.json(results))
    .catch(err => res.status(400).json({message: "that didnt quite word", err}))
}
module.exports.findAllPets = (req,res) => {
    Pet.find({})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({message: "that didnt quite word", err}))
}

module.exports.findOnePet = (req,res) => {
    Pet.findOne({_id: req.params._id})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({message: "that didnt quite word", err}))
}

module.exports.editOnePet = (req,res) => {
    Pet.updateOne({_id: req.params._id}, req.body, {runValidators: true})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({message: "that didnt quite word", err}))
}

module.exports.deleteOnePet = (req,res) => {
    Pet.deleteOne({_id: req.params._id})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({message: "that didnt quite word", err}))
}