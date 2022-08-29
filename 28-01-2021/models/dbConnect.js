const myslq = require('promise-mysql')//enregister dans une variable le require 'promise-mysql'. On fait avec une variable pour modifier.
let db = null //la db à rien. Quand on créer un variable et qu'on met rien il le reconnaîtra comme null.


const singletonDB = {//exporter le module à l'exterieur du fichier. On rend la classe anonyme en js et dedans on expose un objet. Un paterne saint singleton

    connect:() =>{//permet de connecter à la base de donnée. Si connect n'a rien, il connecte à la base de donnée. 
        if(db === null)//il y a rien dans db? donc connection à la db. point ! c'est pour dire si c'était vide! 
        {
            db = myslq.createPool({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'demo_web10_express',
                port: 8889,
                connectionLimit: 1000
            })
        }
    },

    get : () => { //a chaque fois qu'il va redemander des ressource, il va geter la connexion . Pour les recupérer plusieurs 
        if(db === null)
            throw new Error("The db connect is incorrect") //va couper l'execution si il y a une erreur. 
        else
            return db
    }
}
//dans une connection plusieurs millier d'utilisateur! 
// de node expresss=> le but est de creer une api rest. Son but est de décentraliser (splite les elements dans differents endroits) les appels au contact des ressources des données. 5apps qui se connecte sur la même db. C'est les hebergeurs qui vont gerer les requêtes !
module.exports = singletonDB;
