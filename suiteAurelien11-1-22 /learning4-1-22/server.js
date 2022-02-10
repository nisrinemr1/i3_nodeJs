const http = require("http");//require : faire appel a tous les modules dont on aura besoin au fil du code qui sont dans le npm
const url = require("url");
const fs = require("fs");
//const { parse } = require('path'); Ce module permet de gerer les noms de fichier et les transforem les chaine de caractère en objet.autoimport
const querystring = require('query-string');


//tout dépendra de la requete de l'utilisateur! 
const server = http.createServer((req, res) => { //declaration du serveur, afin de créer notre server comme avec mamp/xamp et ont pour paramète la requete et la réponse du serveur

    let urlParse = url.parse(req.url, true); //parser l'url pour avoir un meilleur visuel et qu'il y ait des / 

    //Commencer par si ça ne va pas afin que si c'est le cas, il affiche directement le soucis.
    let contentRes = "";//variable qui affiche le texte
    let statusCode = 500;//Internal Server Error
    let head = { "Content-Type": "text/html; charset=utf-8" };

    // Lecture du fichier
    fs.readFile("./content/datas.json", (errorFile, datas) => { // Si on met ecrit mal le ./content de cette ligne, il affichera l'erreur permet de lire le contenu du fichier. On a pas le choix de mettre autre chose que l'error et la datas dans le paramètre
        //si errorFile is true: 
        if (errorFile) {
            console.log(errorFile);

            //Afficher du coup le text contentRes
            contentRes = "<h1>Erreur du serveur</h1>"
                + "<h2>Le fichier \"data.json\" est en erreur</h2>";

            res.writeHead(500, head); // il affichera dans la console partie network, il affichera le code
            res.write(contentRes);//pour afficher ce qu'il y a ecrit dans le contentRes
            res.end(); //mettre fin à la réponse du processus

            return;  // Met fin au traitement de la fonction et envoyer la réponse à la fonction appellante
        }

        // Conversion des données JSON en JS et donne un tableau plus lisible
        datas = JSON.parse(datas.toString());//parser le fichier json afin qu'il affiche en caractère lisible

        // Traitement de la requete 
        console.log(urlParse);//AFFICHER la datas

        //Traitement de la requete
        if (req.method == "GET") { //si la requete de la methode est en GET, 
            if (urlParse.pathname == "/" || urlParse.pathname == "/accueil") { //si l'urlPars.nomduchemin == / ou a pour urlParse.pathname == /accueil:
                statusCode = 200; //tout vas bien : status 200 
                contentRes = `<h1>Page d'accueil</h1>
            <a href='/categs'>Vers les catégories principales</a>
            <br>
            <a href='/contact'>Vers la page de contact</a>
            <br>
            <a href="/demo?name=Leila&lastname=Myar" 
                Demo GE -> /demo?name=Leila&lastname=Myar
            </a>`;

                res.writeHead(statusCode, head);
                res.write(contentRes);
                res.end();
            }
            //Sinon l'url == /contact il affichera les inputs
            else if (urlParse.pathname == "/contact") {
                statusCode = 200;
                contentRes = `<h1>Page de contact</h1>
                <form method="POST" action="/contact"> /* Il ira dans la parge de contact mais en methode post */
                    <input type="text" name="name"><br>
                    <input type="text" name="lastname">
                    <button type="submit">Envoyer</button>
                </form>`;

                res.writeHead(statusCode, head);
                res.write(contentRes);
                res.end();
            }
            //Sinon si l'url contien /categs
            else if (urlParse.pathname.includes("/categs")) {
                //•Exemple de regex. On l'utilise pour faciliter le code et pour qu'il soit plus simplifié
                const demoRegex = /test/;//elle ne sert à RIEN :) 


                let error404 = null; //declaration de l'erreur 404 //permet d'informer que les produits ont un soucis! autrement on pourrait le mettre plutôt. Null pour mettre l'absence de valeurs on peut mettre des guillemet vide 


                // Categs : 	localhost:3000/categs
                if (urlParse.pathname === "/categs") {//si l'url === /categs 
                    statusCode = 200;

                    contentRes = `<h1>Vous êtes sur les catégories principales</h1>
                    <ul>`;

                    // On parcours les catégories principal du fichier json et pour chaque itemCateg, on affiche son id puis son name après subcategs
                    datas.categs.forEach(itemCateg => {
                        contentRes += `<li><a href="/categs/${itemCateg.id}/subcategs">${itemCateg.name}</a></li>`;
                    });

                    contentRes += `</ul>`; // PAS DE Status 200 quand on rentre dans http://localhost:3000/categs/1/subcategs parce qu'il n'a pas mit dans le sous categorie! 

                    res.writeHead(statusCode, head);
                    res.write(contentRes);
                    res.end();
                }
                else if (/^\/categs\/[1-9][0-9]*\/subcategs(\/[0-9]+)?/.test(urlParse.pathname)) {
                    //dans l'url, on ne pourra pas mettre 01 a la place du 42. Sinon ils faudra retirer le [1-9] et * perrmettra de le repeter autant de fois! Le + c'est pour dire qu'il y a au moin un chiffre ou plus et le ? permet de dire que la parenthèse est optionnel.
                    // Sous-categs :	/categs/42/subcategs
                    // Detail Sub 2 :	/categs/42/subcategs/2
                    // products : 	    /categs/42/subcategs/2/products
                    // product 13 :	    /categs/42/subcategs/2/products?prod=13

                    const urlSplit = urlParse.pathname.split("/");//pour découper l'url regexr grâce au / 
                    //exemple de ce qu'on va recevoir -> ["", categs", "42", "subcategs", "5"] du coup le 42 est donc la deuxième valeur (commence par 0!) Le " " représente le premier slach(localhost:3000).
                    //split  = couper | slice = Pour couper et recupere une partie du tableau | splice = des insert et des removes 

                    console.log(urlSplit);

                    //•récupération de la categId (avec un parseInt)
                    const categId = parseInt(urlSplit[2]); //on va utiliser un split pour découper l'url du site. Il va transformer le string en chaine de caractère dans un tableau! On a ajouter le parse pour recuperer la valeur et le convertir en number vu que dans le fichier json on a mit dans les id des number et non pas des strings. 

                    //•utilisation de la méthode "find" des array de JS pour obtenir l'objet sur base de la valeur "categId". 
                    const categ = datas.categs.find(c => c.id === categId)//La condition du find est envoyé sous forme de prédicat. 
                    //-> Pour chaque categorie, je teste si l'id (.id) est égale à la "categId". le petit c c'est l'element du premier objet de la catégorie. Faite pour retrouver l'id de l'url dans le fichier json
                    console.log(categ);// entre les {} dans le terminal. Il faudrait retirer une fois en prod! 

                    if (categ !== undefined)/* un autre moyen : if(!categ). si il y a une cagorie: si elle est definie*/ {
                        //•Récupération de la sous subCategId (OPTIONNEL!!!!) utilisation de la terner raccourcis du if
                        const subCategId = urlSplit[4] != undefined ?/* est-ce que la categorie dans le split existe */ parseInt(urlSplit[4]) : null;//quatrième index on va le spliter, on le transforme en numer pour le chercher dans le fichier json. Fonction ternaire => le ? est if et : est le else.

                        //si  subCategId pas choisie il affichera ce qu'il y a dans la categ! 
                        if (subCategId === null) {
                            // Sous-categs :	/categs/42/subcategs

                            contentRes += `<h1>Catégorie : ${categ.name}</h1>
                            <p> Ajout du menu! </p>
                            <h2>Veuillez selectionner une sous-catégorie:</h2>
                            <ul>`;
                            categ.subcategs.forEach((subCateg) => {
                                contentRes += `<li>
                                <a href="/categs/${categ.id}/subcategs/${subCateg.id}">
                                ${subCateg.name}
                                </a>
                                </li>`
                            });

                            contentRes += "</ul>";
                            res.writeHead(200, head);
                            res.write(contentRes);
                            res.end();
                        }
                        //Si on clique dessus
                        else {
                            // Detail Sub 2 :	/categs/42/subcategs/2
                            //il va chercher l'id de la sous-categorie dans le fichier json (ligne 112 déjà parsé)
                            const subCateg = categ.subcategs.find(sc => sc.id === subCategId);

                            //si on clique sur subCateg, il affiche ce qu'il y a dans le if
                            if (subCateg != undefined) {
                                contentRes = `<h1>La catégorie principal : ${categ.name}</h1>
                                                <h2>Catégorie secondaire : ${subCateg.name}</h2>
                                                <br>
                                                <h3>Liste des produits</h3>
                                                <ul>`;

                                //pour afficher les produits dans le subCateg
                                subCateg.products.forEach(product => {
                                    contentRes += `<li>
                                    ${product.name} ${product.price} €
                                    </li>`
                                })

                                contentRes += `</ul>`
                                statusCode = 200;

                                res.writeHead(statusCode, head);
                                res.write(contentRes);//recuperer la CategID donc ligne 86
                                res.end();
                            }
                            else {
                                error404 = "Sous categorie inconnue";
                            }

                        }
                        // TODO : A FAIRE: 
                        // product 13 :	    /categs/42/subcategs/2/products?prod=13
                    }
                    else {
                        error404 = ":( Catégorie non disponible";
                    }
                }
                else {
                    error404 = "Page invalide";
                }

                // en cas d'erreur => Affichage de la page
                if (error404) {
                    res.writeHead(404, head);
                    res.write("Not found ->" + urlParse.pathname);
                    res.end();
                }
            }
            else if(urlParse.pathname == "/demo"){
                //Traitement des données GET
                //Donc regarder ce qu'il y a dans nos paramètres. Il a utiliser l'urlParse pour extraire les element de la requete (let urlParse = url.parse(req.url, true); tout en haut)
                //en faisant ceci, on a les information utile qui affiche l'obet Url (donc url{} dans le terminal). Mais dans un format de données brut dans seach: ?name=Leila&lastname=Myar%22
                console.log(urlParse.search);

                //Les données seront traité en objet js et seront ajouter dans la propriété "Query"
                console.log(urlParse.query);
                //resultat : [Object: null prototype] { name: 'Leila', lastname: 'Myar"' }

                const dataGet = urlParse.query;
                console.log(dataGet);

                statusCode = 200;
                contentRes = `
                    <h1>Reception des données "GET"</h1>
                    <h2>Les données reçu sont: </h2>
                    <p>${dataGet.name} ${dataGet.lastname}</p>
                `;

                res.writeHead(statusCode, head);
                res.write(contentRes);
                res.end();


            }
            else{//vu que c'est ni /contact ni /categs
                res.writeHead(404, head);
                res.write(`<h1>Vous êtes perdu? :0</h1>`);
                res.end();
            }
        }
        else if (req.method == "POST") {
            if (urlParse.pathname == "/contact") {
                let body = "";

                //Lecture des données POST de la requête
                req.on('data', (form) => {
                    body += form.toString();//le form si on met pas ça il donnera un buffer(en ascii!) en Hexa décimal. Et va le convertir directement. body de la requete c'est pour stocker le form tostring dedans
                });

                //Se déclanche après que les données ont été traitée
                req.on('end', () => {
                    console.log(body);
                    //ici je suis dans la possibilité de recevoir de mon body (formulaire)
                    // "name=loic&lastname=baudoux"    ====> STRING que je peux parser avec le décodeur
                    // "{ 'name' : 'loic', 'lastname' : 'baudoux'}"     =====> STRING que je peux parser avec JSON.parse()
                    let result; // Test pour savoir si les données sont de type json ou si c'est de type application/x-www-form-urlcoded

                    if (body.startsWith("{") && body.endsWith("}"))
                        result = JSON.parse(body);

                    else {
                        
                       //traitement si les données sont au format x-www-form-urlencoded
                       // body -> name=Zaza&lastname=Vanderquack
                        result = querystring.parse(body);
                        //https://www.npmjs.com/package/query-string
                        //installation du query-string et on va le déclarer tout en haut dans une constante
                        //le resultat: {lastename: 'Vanderquack', name:'Zaza'} car il l'a converti en format objet JS !                    }

                    }
                    console.log(result);


                    //Utilmisation des données dans la page de réponse
                    statusCode = 200;
                    contentRes = `
                    <h1> Page de contact - Réponse </h1>
                    <h2> Bienvenue ${result.name} ${result.lastname}</h2>
                    <a href="/">Retourner à la page d'acccueil</a>
                    `;

                    res.writeHead(statusCode, head);//point virgul dira que ça se termine maintenant ! 
                    /* res.write(contentRes); On aura plus besoin */
                    res.end(contentRes);//si on veux, on peut ecrire dedans ! donc l'ecriture et la fin! 
                });


                //je traite le formulaire ici
                //et puis je redirige mon client vers autre part.
                /* statusCode = 303;
                head = { "Location": "/" };

                res.writeHead(statusCode, head);
                res.write(contentRes);
                res.end();*/
                // statusCode 302 -> redirection standard
                // 307 -> passer de get à post puis redirger vers le meme lien en post 
                // 303 -> passer de get à post puis redirger vers un autre lien en get 
            }
        }
        else {
            statusCode = 404;
            contentRes = `<h1>Je ne connais pas cette méthode HTTP : ${req.method}</h1>`;

            res.writeHead(statusCode, head);
            res.write(contentRes);
            res.end();
        }

    });
});

server.listen(process.env.PORT || 3000);