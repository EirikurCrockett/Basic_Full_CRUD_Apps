const PetControl = require("../controllers/pet.controller");

module.exports = (app) => {
    app.get("/api/pet/all", PetControl.findAllPets)
    app.post("/api/pet/new", PetControl.createPet)
    app.get("/api/pet/:_id", PetControl.findOnePet)
    app.patch("/api/pet/:_id/edit", PetControl.editOnePet)
    app.delete("/api/pet/:_id/delete", PetControl.deleteOnePet)
} 