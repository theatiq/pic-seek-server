const express = require("express")
const { insertAiImage, getAllImage } = require("../controllers/image.controller")


const imgRouter = express.Router()


imgRouter.post("/create", insertAiImage)
imgRouter.get("/all", getAllImage)

module.exports = imgRouter