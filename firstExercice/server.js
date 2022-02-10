const http = require("http")
const url = require("url")

const server = http.createServer((req,res)=>{

    let urlParse = url.parse(req.url, true)

    if(urlParse.pathname == "/" || urlParse.pathname == "/accueil"){
        let contentRes = ""
        let statusCode = 500
    }
    else if(urlParse.pathname == "/contact"){

    }
    else if(urlParse.pathname.includes("/categ")){
        statusCode = 200
        contentRes = "<h1> Vous êtes sur les catégories principales</h1>"
        if(urlParse.pathname.includes("/subcateg")){
            statusCode = 200 
            contentRes = `<h1> Vous êtes sur les catégories secondaires</h1>
                            <p> Categ principale : </p>`

            if (urlParse.pathname.includes("/product")){
                if(urlParse.query.productID){
                    statusCode = 200 
                contentRes = `<h1> Vous êtes sur un produit</h1>
                <p>Categ principale : ${urlParse.query.categID}</p>
                <p>Categ secondaire : ${urlParse.query.subcategID}</p>
                <p>Produit sélectionné : ${urlParse.query.productID}</p>`
                }
                statusCode = 200 
                contentRes = `<h1> Vous êtes sur la liste des produits</h1>
                <p>Categ principale : </p>
                <p>Categ secondaire : </p>`
            }
        }
    }
    else{
        statusCode = 404 
        contentRes = "<h1> Oopsiiii, page non trouvées</h1>"
    }
    res.writeHead(statusCode, {"Content-type": "text/html; charset=utf-8"})
    res.write(contentRes)
    res.end()
})

server.listen(3000)