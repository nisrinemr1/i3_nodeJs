const http = require("http")
const url = require("url")
const fs = require("fs")


const server = http.createServer((req, res) => {

    let urlParse = url.parse(req.url, true)

    let contentRes = ""
    let statusCode = 500
    let head = { "Content-Type" : "text/html; charset=utf-8" }

    if(req.method == "GET")
    {
        if(urlParse.pathname == "/" || urlParse.pathname == "/accueil")
        {
            statusCode = 200
            contentRes = `<h1>Page d'accueil</h1>
            <a href='/categs'>Vers les catégories principales</a>`

            res.writeHead(statusCode, head)
            res.write(contentRes)
            res.end()
        }
        else if(urlParse.pathname == "/contact")
        {
            statusCode = 200
            contentRes = `<h1>Page de contact en mode GET</h1>
                <form method = "POST"><label for = "name">Nom:</label>
                <input type="text" name="name"><br>
                <label for = "name">Prénom:</label>
                <input type="text" name="lastname">
                <button type="submit">Envoyer</button>`

            res.writeHead(statusCode, head)
            res.write(contentRes)
            res.end()
        }
        else if(urlParse.pathname.includes("/categs")) 
        {

            if(urlParse.pathname.includes("/subcategs")) 
            {

                if(urlParse.pathname.includes("/products"))
                {
                    if(urlParse.query.productID)//localhost:3000/categs/subcategs/products?categID=1&subcategID=2&productID=42
                    {
                        statusCode = 200
                        contentRes = `<h1>Vous êtes sur un produit</h1>
                        <p>Categ principale : ${urlParse.query.categID}</p>
                        <p>Categ secondaire : ${urlParse.query.subcategID}</p>
                        <p>Produit sélectionné : ${urlParse.query.productID}<p>`

                        res.writeHead(statusCode, head)
                        res.write(contentRes)
                        res.end()
                    }
                    else //localhost:3000/categs/subcategs/products?categID=1&subcategID=2
                    {
                        statusCode = 200
                        fs.readFile("./content/produit.json", (error, datas) => {
                            console.log(error)
        
                            datas = JSON.parse(datas.toString())
        
                            contentRes = `<h1>Vous êtes sur les produits des catégories principales</h1>
                            <ul>`
        
                        datas.forEach(item => {
                            contentRes += `<li><a href="/categs/subcategs/products?categID=${urlParse.query.categID}&subcategs${item.id}">${item.name}</a></li>`
                            })
                            console.log(urlParse)

        
                            contentRes += `</ul>`
        
                            res.writeHead(statusCode, head)
                            res.write(contentRes)
                            res.end()
                        })
                    }    
                }
                else//localhost:3000/categs/subcategs?categID=1
                {
                    statusCode = 200
                    fs.readFile("./content/subCategs.json", (error, datas) => {
                        console.log(error)
    
                        datas = JSON.parse(datas.toString())
    
                        contentRes = `<h1>Vous êtes sur les catégories principales</h1>
                        <ul>`
    
                        datas.forEach(item => {
                            contentRes += `<li><a href="/categs/subcategs?categID=${item.id}">${item.name}</a></li>`
                        })
    
                        contentRes += `</ul>`
    
                        res.writeHead(statusCode, head)
                        res.write(contentRes)
                        res.end()
                    })
                }
            }
            else //localhost:3000/categs
            {
                statusCode = 200

                fs.readFile("./content/categs.json", (error, datas) => {
                    console.log(error)

                    datas = JSON.parse(datas.toString())

                    contentRes = `<h1>Vous êtes sur les catégories principales</h1>
                    <ul>`

                    datas.forEach(item => {
                        contentRes += `<li><a href="/categs/subcategs?categID=${item.id}">${item.name}</a></li>`
                    })

                    contentRes += `</ul>`

                    res.writeHead(statusCode, head)
                    res.write(contentRes)
                    res.end()
                })
            }
        }
        else
        {
            statusCode = 404
            contentRes = "<h1>Oops, page non trouvée</h1>"

            res.writeHead(statusCode, head)
            res.write(contentRes)
            res.end()
        }

    }
    else if(req.method == "POST")
    {
        if(urlParse.pathname == "/contact")
        {
            let body = ""

            req.on('data', (form) => {
                body += form.toString()
            })

            req.on('end', () => {

                //ici je suis dans la possibilité de recevoir de mon body (formulaire)
                // "name=loic&lastname=baudoux"    ====> STRING que je peux parser avec le décodeur
                // "{ 'name' : 'loic', 'lastname' : 'baudoux'}"     =====> STRING que je peux parser avec JSON.parse()
                if(body.startsWith("{") && body.endsWith("}"))
                    body = JSON.parse(body)
                else{

                    /*
                    Convertit "name=loic&lastname=baudoux" en JSON { 'name' : 'loic', 'lastname' : 'baudoux' } utilisable
                    */
                    body = JSON.parse('{"' + decodeURI(body).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
                }

                console.log(body)
            })


            //je traite le formulaire ici
            //et puis je redirige mon client vers autre part.
            statusCode = 303
            head = { "Location" : "/"}

            res.writeHead(statusCode, head)
            res.write(contentRes)
            res.end()


            // statusCode 302 -> redirection standard
            // 307 -> passer de get à post puis redirger vers le meme lien en post 
            // 303 -> passer de get à post puis redirger vers un autre lien en get 
        }
    }
    else
    {
        statusCode = 404
        contentRes = `<h1>Je ne connais pas cette méthode HTTP : ${req.method}</h1>`

        res.writeHead(statusCode, head)
        res.write(contentRes)
        res.end()
    }
})

server.listen(3000)