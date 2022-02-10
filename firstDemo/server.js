/* const http = require("http") */
//met dedans la librairie http! Le mot cle require vient de l'element node. Et ne fonctionne qu'avec des modules! 
//Maintenant on va l'utiliser pour creer le server

/* const server = http.createServer(()=>{}) */
//peut ne pas mettre le ;. 

//callback en node: fonction anonyme fleché. Possible de retirer le mot fonction donc ça devient : 
//() => {}
//Comme ça 

//parametre
/* function sayHello(){
    console.log("Say hello");
} */

//fonction
/* function test(callbackTutu){
    setTimeout(() => {
        callbackTutu()
    }, 1000)
} */

//appel de la fonction qui est dans la ligne 13
/* test(sayHello) */


const http = require("http")

const server = http.createServer((req, res) =>{ 
    console.log(req.method)
    console.log(req.url)

if(req.url == "/")
{
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
    res.write("<h1> Bonjour à tous! </h1>")
    res.end()
}

else if(req.url == "/contact")
{
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
    res.write("<input name='name' type='text'>")
    res.end()
}

else{
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
    res.write("<h1> Erreur 404 </h1>")
    res.end()
}

    //TOUJOURS DANS CET ORDRE!!!! 
})

server.listen(3000, console.log("Le serveur écoute sur le port 3000"))


/* aller chercher les documents http dans les serveurs */
/* const http = require("http");
const url = require("url"); //renvoie d'un objet
/* dans cette constante, tu me crées un serveur */
/* const server = http.createServer((req, res)=>{
    //unfois qu'il aura fini de créer le serveur, il va exécuter les call back
    console.log(req.method)
    console.log(req.url)
   let urlParse = url.parse(req.url, true)
    console.log(urlParse) 
    if(urlParse.pathname == "/"){
        res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"})
        res.write("<h1>Je suis sur l'accueil</h1>")
        res.end()
    } */
  /*   else if (urlParse.pathname == "/contact") {
        res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"})
        res.write("Je suis sur la page contact")
        res.end()
    }
    else if (urlParse.pathname == "/services")//pathname est un paramètre de route
    {
        if(urlParse.query.pays)//query est un variable de route
        {
            res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"})
            res.write("Je suis sur la page services")
            res.write("sur le pays : " + urlParse.query.pays)
            res.end()
        }
    } */
    /* else if (urlParse.pathname == "/categ/subcateg")
    {
        if(urlParse.query.id)//query est un variable de route
        {
            res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"})
            res.write("Je suis sur la page subcateg des categ")
            res.write("sur l'id : " + urlParse.query.id)
            res.end()
        }
    } */
   /*  else {
        res.writeHead(404, {"Content-Type" : "text/html; charset=utf-8"})
        res.write("<h1> Erreur 404</h1>")
        res.end()
    } */
    /* test = {
        name:"tutu",
        last: "toto"
    }
 */
   /*  res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"}) *///permet de définir un sattut code et l'entête // tout changement affecté à l'entête de notre résultat (code d'erreur 200, ou 204, etc.)
//statutCode : http (de type number)
//statusMessage: qui peut être nul, pas d'obligation - le point ? le signal (de type string)
//hearders: objet javascript qui reprend les terme de header http (pas obligatoire non plus et de type outgoingheepheaders - ex Utf8, texte, image, etc.)
//1 surcharge de méthode : orienté objet avancé = 
   /*  res.write("Bonjour, comment vas-tu mon amie?") *///ça écrit dans la requête
  /*  res.write(JSON.stringify(test); */
  /* res.write("<h1> Bonjour mon amie ! </h1>") */
    //res.end() //nécesssaire pour que ma requête res.write s'affiche, soit envoyé. Cela cloture la requète et son résultat
//})
/* utilisation d'un callbak pour exécuter les requêtes en plusieurs tempms en fonction des différentes demandes */
/* emploie des fonctions anonymes fléchées */
/*()=>{
} */
//rappel des fonctions call back
/* function sayhello(){
    console.log("Say hello")
}
function test(callbacktutu){
    setTimeout(()=>{
        callbacktutu()
    }, 1000)
}
test(sayhello) */
/* server.listen(3000, console.log("Le serveur écoute sur le port 3000")) */ // nécessaire pour se mettre en écoute sur le réseau / sur quel port le server va écouter. Entre les parenthèses, 
//installation des nodemon de manière globale aux packages du syst node // system de live reload 
// mettre la commande npm install -g nodemon
//yolo
//création d'un fichier js
//ouverture de la console
//initialisation d'un projet / nouveau server => npm init
//package name = le nom que l'on veut donner au projet, par défaut, il donne le dossier où il est
//version: la version de mon projet
//description: que l'on peut mettre
//entry point: par où il doit démarrer l'application, par défaut, il sélectionne le premier fichier js qu'il trouve
//test command : pas tellement utile pour le moment
//git repo: possible si on veut le git => mettre le lien de ton repo créer sur github
//keywords: mots clefs que tu utiliseras pour le retrouver sur npm si tu le déposes là
//author: toi
//license : une license gratuite
//ensuite, il te fait un résumé de ce que tu as écrit et tu peux rentrer Y (pour YES)
//le paquet Json sera alors créé
//si jamais soucis pour empêcher le système de bloque pas 
//Set-ExecutionPolicy -Scope "CurrentUser" -ExecutionPolicy "Unrestricted"