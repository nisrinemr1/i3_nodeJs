const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send(`<h1>La documentation de mon api rest</h1>`)
})

module.exports = router