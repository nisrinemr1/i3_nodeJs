//JWT POUR LA SECURITE!!!! UN MINIMUM!!

const db = require('../models/dbConnect').get() //pour récup le get de la connection à la db 
// connecter la db à tous les controllers! Pour preparer le système à récuperer les requêtes 


exports.getAllProducts =  (req, res) => {
    //utilisation de la résolution de promesse: code non bloquant. Quand il executrera pour rendre non bloquant !. on peut le mettre dans tous les export.
    db.then((connection) =>{ //résolution de promesse. des que la connection est terminée, elle va répondre then quand c'est positif et quand c'est négatif, il va dire: ... 
        //console.log(connection)
        //erreur rouge: SQL! 
        connection.query("select * from products").then((datas)=>{
            console.log(datas)
            //datas est dispo uniquement dans les acolades dispo ici!!!!!! JAMAIS EN DEHORS D'ICI!
            res.json(datas)//REPONSE ICI!!!!
        }) //aprè avoir recu le lien de connection, on va utiliser une query pour faire une requete et on recupere par la requete les produits. 
    })
    
    //console.log(db)La ré
}

/*
    localhost:3000/api/products/            --> get all
    localhost:3000/api/products/:id         --> get one by id
    localhost:3000/api/products/            --> post product
    localhost:3000/api/products/:id         --> put / patch product
    localhost:3000/api/products/:id         --> delete one product
*/

exports.getOneProduct = (req, res) => {
    let id = req.params.id
    // On doit le mentionner partout le db ! 
    db.then((connection) => {
        connection.query("select * from products where id = ?", [id]).then((datas) => { 
            res.json(datas)
        }) //le ? c'est pour placer un paramères donc c'est l'id juste au dessus. Ne jamais le mettre dedans sinon faille de sécu! 
    })
}


exports.postProduct = (req, res) => {
    let name = req.body.name
    let price = req.body.price

    db.then((connection) => {
        //j'ai, à cet endroit, l'objet de connection, le lien à la db,
        //je vais faire un insert into, dans products, j'ai besoin de lui donner name et price -> (name, price)
        //avec les valeurs (?, ?) 
        //pour sécuriser la requète, je lui donne un tableau contenant par ordre !!!! les paramètres demandé
        //donc -> [name, price], le premier ? contiendra name, et le deuxième ? contiendra price
        connection.query("insert into products (name, price) values (?, ?)", [name, price]).then((result) => {
            res.json(result)
        })
    })
}

//modifier en mode PUT! 
exports.putProduct = (req, res) => {
    let id = req.params.id
    let name = req.body.name    
    let price = req.body.price

    db.then((connection) => {
        connection.query("update products set name = ?, price = ? where id = ?", [name, price, id]).then((result)=>{
            res.json(result)
        })
    })
}


exports.deleteProduct = (req, res) => {
    let id = req.params.id
    // On doit le mentionner partout le db ! 
    db.then((connection) => {
        connection.query("delete from products where id = ?", [id]).then((datas) => { 
            res.json(datas)
        }) //le ? c'est pour placer un paramères donc c'est l'id juste au dessus. Ne jamais le mettre dedans sinon faille de sécu! 
    })
}
