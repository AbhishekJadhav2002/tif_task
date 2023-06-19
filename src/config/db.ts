require("dotenv").config();
import { Sequelize, DataTypes } from "sequelize";

const MYSQL_URL = process.env.DATABASE_URL as unknown as string;
const sequelize = new Sequelize(MYSQL_URL);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
}

export { connectDB, sequelize, Sequelize, DataTypes };