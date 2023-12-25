import express from "express"
import "dotenv/config"
import router from "./router.js"
import "./db.js"
import path from "path"

const app = express()
const PORT = process.env.PORT || 5000

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(path.resolve(), "assets")))
app.set("view engine", "ejs")
app.use(router)

app.listen(PORT, _ => console.log(`Server is hosted to localhost:${PORT} ...`))