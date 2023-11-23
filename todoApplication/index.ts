import dotenv from 'dotenv';
import express, {Express, Request, Response} from 'express';
import {DataSource} from 'typeorm'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import { tasksRouter } from './src/tasks/tasks.router';

// Instantiate Express app
const app :Express = express();
app.use(express.json());
dotenv.config();

// Parse Request Body
app.use(bodyParser.json());
// Use CORS install types as well
app.use(cors());

// Create DataBase Connection
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: "localhost",
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    synchronize: true,
    entities: ["src/entity/**/*.ts"],
});

// Define Port
const port = process.env.PORT 

// Create a default route
app.get('/', (req :Request, res : Response) => {
    res.send('Response From Express Server, I fdgxchvjbam listening only for you..');
});


AppDataSource.initialize().then(() =>{
    // Start the application by listening on PORT
    app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch((err)=> console.log(err));

app.use("/", tasksRouter);

