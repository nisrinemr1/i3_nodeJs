const express = require("express")
const router = express.Router()


// localhost:3000/api/users/       -->GET all users (récupérer tout les users)
router.get("/",(req, res) => {
    res.json({
        message : "Liste de tous les users"
    })
})


// localhost:3000/api/users/:id    -->GET one user by id (récupérer un user)
// localhost:3000/api/users/42 || localhost:3000/api/users/tutu
router.get("/:id", (req, res) => {
    console.log(req.params.id)
    res.json({
        message : "Un seul user"
    })
})


// localhost:3000/api/users/       -->POST one user (ajouter un user)
router.post("/", (req, res) => {
    res.json({
        message : "Création d'un user"
    })
})


// localhost:3000/api/users/:id    -->PUT one user (modifir un user)
router.put("/:id", (req, res) => {
    res.json({
        message : "Modification d'un user"
    })
})


// localhost:3000/api/users/:id    -->DELETE one user(supprimer un user)
router.delete("/:id", (req, res) => {
    res.json({
        message : "Suppression d'un user"
    })
})


module.exports = router
