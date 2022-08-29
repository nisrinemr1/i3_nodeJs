const express = require("express")
const router = express()


//localhost:3000/contact     -> get de la page contact (formulaire)
router.get("/", (req, res) => {
    res.send(`<h1>Formulaire de contact</h1>`)
})


//localhost:3000/contact      -> post du formulaire (envoi du formulaire)
router.post("/", (req, res) => {
    res.json({
        message : "Formulaire bien recu"
    })
})

module.exports = router