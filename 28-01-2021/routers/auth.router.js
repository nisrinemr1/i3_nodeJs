const express = require("express"); // on recherche le core (coeur) d'express! 
const router = express.Router(); //chercher le routage, on infect et on export

//pour ne pas surcharger le server. tout ne sera pas appeler en même temps. 

router.post("/", (req, res) =>{
    res.json({
        message: "Tu es conneté"
    })
})
//on se connecte

router.get("/", (req,res) =>{
    res.json({
        message: "Création du client ok"
    })
})
//créer le client

router.get("/logout", (req,res) => {
    /* va detruire le token de l'utilisateur. Normalement on ne met pas de logout. */
    res.json({
        message: "Vous êtes déconnecté"
    })
})
//logout 

//puis mettre le module export 
module.exports = router//export tout le router qui va exporter tout ce qu'il y a dans le server.js recup le router par le server


//création de 3 root. La première sera un GET
