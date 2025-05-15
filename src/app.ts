import express from "express"
import http from "http";
import cors from "cors";
import morgan from "morgan";
import router from "./routes";
import ServerResponse from "./helpers/serverResponse";

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT ?? 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors({origin: "*"}))
app.disable("x-powerd-by")
app.use(morgan("dev"))

app.use("/api/v1", router)
app.use("*", (req, res) => {
    return ServerResponse.error(res, "Route not found")
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})