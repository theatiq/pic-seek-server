// Definitions
require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const logger = require("./middleware/logger")
const imgRouter = require("./routes/image.routes")
const commentRouter = require("./routes/comment.route")

// Middleware
app.use(cors())
app.use(express.json())
app.use(logger)

// Router

app.use("/api/v1/image", imgRouter)
app.use("/api/v1/comment", commentRouter)


// Playground





app.get("/", (req, res) => {
    res.send({
        status: 200,
        message: "Server is running"
    })
})

module.exports = app