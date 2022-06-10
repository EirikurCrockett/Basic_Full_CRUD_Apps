const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    petName: {
        type: String,
        required: [true, "Pet Name is Required"],
        minLength: [3, "Pet Name must be at least 3 characters"]
    },
    petType: {
        type: String,
        required: [true, "Pet Type is Required"],
        minLength: [3, "Pet Type must be at least 3 characters"]
    },
    petDescription: {
        type: String,
        required: [true, "Pet Description is Required"],
        minLength: [3, "Pet Description must be at least 3 characters"]
    },
    skill1: {
        type: String,
        required: false
    },
    skill2: {
        type: String,
        required: false
    },
    skill3: {
        type: String,
        required: false
    }
})

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;