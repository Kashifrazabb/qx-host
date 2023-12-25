import { Router } from "express"
import qxModel from "./db.js"

const router = Router()

router.get("/", (req, res) => {
    qxModel.find({}).then(users => {
        res.render("index", { users })
    })
})

router.post("/add-member", (req, res) => {
    const { M, P, m, p, Ḻ, ḏ, ṗ, ẇ } = req.body
    const letters = [M, P, m, p, Ḻ, ḏ, ṗ, ẇ]
    const { username, userid, email, flag, custom, sig } = req.body
    qxModel
        .create({ username, sig, userid, email, flag, custom, letters })
        .then(_ => res.redirect("/"))
})

router.post("/delete-member", (req, res) => {
    const { id } = req.body
    qxModel.findOneAndDelete({ _id: id })
        .then(_ => res.redirect("/"))
})

router.post("/update-member", (req, res) => {
    const { M, P, m, p, Ḻ, ḏ, ṗ, ẇ } = req.body
    const letters = [M, P, m, p, Ḻ, ḏ, ṗ, ẇ]
    const { username, userid, email, flag, custom, id, sig } = req.body
    qxModel
        .findOneAndUpdate({ _id: id }, { username, sig, userid, email, flag, custom, letters })
        .then(_ => res.redirect("/"))
})

router.get("/all", (req, res) => {
    var { sig, type } = req.query
    qxModel.findOne({ sig }).then(user => {
        if (user) {
            if (user.letters.includes(type)) {
                res.json(user)
            }
            else {
                res.json({})
            }
        }
        else {
            res.json({})
        }
    })
})

export default router