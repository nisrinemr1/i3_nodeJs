const express = require("express")
const app = express()
const port = process.env.PORT || 3000
//connecter le server à la base de donnée 
const db = require('./models/dbConnect')
db.connect()

app.use(express.json())
app.use(express.urlencoded({extended : true})) //morceau de config qu'on grefe à express pour qu'il puisse utiliser! 

const othersRouter = require("./routers/others.route")
const usersRouter = require("./routers/users.router")
const authRouter = require("./routers/auth.router")
const categoriesRouter = require("./routers/categories.router")
const productsRouter = require("./routers/products.router")
const contactsRouter = require("./routers/contacts.router")


app.get("/", othersRouter)


/* Match router pour :
    localhost:3000/api/users/       -->GET all users (récupérer tout les users)
    localhost:3000/api/users/:id    -->GET one user by id (récupérer un user)
    localhost:3000/api/users/       -->POST one user (ajouter un user)
    localhost:3000/api/users/:id    -->PUT one user (modifir un user)
    localhost:3000/api/users/:id    -->DELETE one user(supprimer un user)

    dès que express détècte /api/users, il va contacter ET envoyer la requète vers ce router la.
    MAIS ce qu'il fait de manière "humaine" ->
        url.pathname = /api/users/mesgenoux/tutu/toto -> L'envoi vers le router, sous ce format LA !! ->
        -> /mesgenoux/tutu/toto
*/
app.use("/api/users", usersRouter) // utilise le middleware use du routage


/*
    localhost:3000/api/categories/          --> get all
    localhost:3000/api/categories/:idProd   --> get one by id
    localhost:3000/api/categories/          --> post categories
    localhost:3000/api/categories/:idProd   --> put / patch categories on product
    localhost:3000/api/categories/:idProd   --> delete one categories on product
*/
app.use("/api/categories", categoriesRouter)


/*
    localhost:3000/api/products/            --> get all
    localhost:3000/api/products/:id         --> get one by id
    localhost:3000/api/products/            --> post product
    localhost:3000/api/products/:id         --> put / patch product
    localhost:3000/api/products/:id         --> delete one product
*/
app.use("/api/products", productsRouter)





app.use("/api/auth", authRouter)


/*
    function use("chaine de caractère", Router){
        ajoute a express, toutes vos routes
    }
*/

/*
    localhost:3000/contact     -> get de la page contact (formulaire)
    localhost:3000/contact      -> post du formulaire (envoi du formulaire)
*/
app.use("/contact", contactsRouter)



app.listen(port, console.log(`Le serveur écoute sur le port ${port}`))
