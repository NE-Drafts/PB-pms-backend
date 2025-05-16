import express from "express";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import router from "./routes";
import ServerResponse from "./helpers/serverResponse";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger/doc/swagger.json";
import { config } from "dotenv";

config()

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.disable("x-powerd-by");
app.use(morgan("dev"));

app.use("/api/v1", router);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("*", (req, res) => {
  return ServerResponse.error(res, "Route not found");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
