import registerRoutes from "./routes/index";
import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Instantiate Express app
const app: Express = express();

// Additonal Middlewares for Express App
app.use(express.json()); //Use express json to receive request in JSON format
app.use(bodyParser.json()); // Parse Request Body
app.use(cors()); // Use CORS install types as well

registerRoutes(app);

export default app;
