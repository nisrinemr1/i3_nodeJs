const express = require("express");
const app = express();
const port = process.env.PORT || 3000

const usersRouter = require("./router/users.router")
const authRouter = require("./router/auth.router")

app.use("/api/users", usersRouter) //utilise le middle ware du routage
app.use("/api/auth", authRouter) 

/* function use("chaine de caractère", router){
    ajout a express, toutes vos routes
} */

/* middleware, c'est une voiture sans option sans rien et le middleware serait d'ajouter des options en plus dans la voiture. Le fait d'ajouter ces routes là à express, c'est par le use */

app.listen(port, console.log(`le serveur écoute bien sur le port ${port}`))