const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes.js")
const fileUpload = require("express-fileupload")
const app = express();
const PORT = config.get("serverPort")
const corsMiddleware = require("./middleware/cors.middleware.js")

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/files",fileRouter)

const start = async () => {
    try {
        await mongoose.connect(config.get("dbURL"))
        console.log("connected to DB")
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (error) {
        console.error(error)
    }
}


start()