require("dotenv").config();
import express from "express";
import { connectDB, sequelize } from "./config/db";
import defaultMiddlewares from "./middleware";
import router from "./routes/v1/index.routes";

let app = express();

app = defaultMiddlewares(app);

app.use("/v1/", router);

app.listen(process.env.PORT as string || 8000, async () => {
  console.log("🚀Server started Successfully");
  await connectDB();
  sequelize.sync({ force: false }).then(() => {
    console.log("✅Synced database successfully...");
  });
});