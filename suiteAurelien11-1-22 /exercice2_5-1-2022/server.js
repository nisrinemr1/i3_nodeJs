const fs = require("fs")

fs.readFile("./content/datas.json", (error, datas) =>{
    if(error != null) return

    datas = datas.toString()
    datas = JSON.parse(datas)

    datas.maisonprod.forEach((item_categ) => {
        console.log(" " + item_categ.name)

        item_categ.categceleb.forEach((item_subcateg) => {
            console.log("    " + item_subcateg.name)

            if(item_subcateg.chanteurs){
                item_subcateg.chanteurs.forEach((item_chanteurs) => {
                    console.log("        " + item_chanteurs.name)
                })
            }
            if(item_subcateg.acteurs){
                item_subcateg.acteurs.forEach((item_acteurs) => {
                    console.log("        " + item_acteurs.name)
                })
            }
        })
    })
}) 