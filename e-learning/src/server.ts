import app from "./app";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log(
      " ------------------------------- Data Source initialized ------------------------------"
    );

    app.listen(PORT, () => {
      console.log(
        `-------------------------- Listening at http://localhost:${PORT} --------------------------`
      );
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
