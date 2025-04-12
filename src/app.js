// Definitions
require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const logger = require("./middleware/logger")
const generateImageUrl = require("./utils/ai/generateImageURL")
const { imageCollection } = require("./utils/connectDB")
const getImageBuffer = require("./utils/ai/getImageBuffer")

// Middleware
app.use(cors())
app.use(express.json())
app.use(logger)

// Playground

app.post("/create-image", async (req, res) => {
    const { email, prompt, category, username, userImg } = req.body
    if (!email || !prompt || !category || !username || !userImg) {
        res.status(400).send({
            status: 400,
            message: "Please provide email, prompt, category, username, userImg"
        })
    }
    // res.send({})
    try {
        const buffer = await getImageBuffer(prompt, category)
        console.log(buffer)
        const data = await generateImageUrl(buffer, prompt)
        console.log(data)
        const document = {
            email,
            username,
            userImg,
            prompt,
            category,
            thumbImg: data.data.thumb.url,
            mediumImg: data.data.medium.url,
            originalImg: data.data.image.url,
            createdAt: new Date().toISOString()
        }
        const result = await imageCollection.insertOne(document)
        console.log(document)
        res.send({ ...result, url: data.originalImg })

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})



app.get("/", (req, res) => {
    res.send({
        status: 200,
        message: "Server is running",
        status2: 200,
        message3: "Server is running"
    })
})

module.exports = app