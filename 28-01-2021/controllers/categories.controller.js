exports.getAllCategories = (req, res) => {
    res.json({
        message : "Voici toutes les catégories"
    })
}


exports.getOneCategorie = (req, res) => {
    res.json({
        message : "Voici la catégorie demandée"
    })
}


exports.postCategorie = (req, res) => {
    res.json({
        message : "Création de la catégorie"
    })
}


exports.putCategorie = (req, res) => {
    res.json({
        message : "Catégorie bien modifiée"
    })
}


exports.deleteCategorie = (req, res) =>{
    res.json({
        message : "Catégorie bien supprimée"
    })
}
