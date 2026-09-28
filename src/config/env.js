import { config } from "dotenv";
config();
const env = {
  MONGO_NAME: process.env.MONGO_NAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_IP: process.env.MONGO_IP || "mongo",
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  PORT: process.env.PORT,
  REDIS_URL: process.env.REDIS_URL || "redis://redis:6379",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET,
};

export default env;
