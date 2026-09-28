import express from "express";
import env from "./config/env.js";
import mongoose from "mongoose";
import redis from "redis";
import { RedisStore } from "connect-redis";
import session from "express-session";

let redisClient = redis.createClient({
  url: env.REDIS_URL,
});

const connectToRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Redis connection failed:", error);
    process.exit(1);
  }
};

import postRoutes from "./routes/post-routes.js";
import userRoutes from "./routes/auth-routes.js";

const app = express();

const PORT = env.PORT || 3000;
const mongoURL = `mongodb://${env.MONGO_NAME}:${env.MONGO_PASSWORD}@${env.MONGO_IP}:${env.MONGO_PORT}/?authSource=admin`;

const connnectWithRetry = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("connected to db successfully");
  } catch (error) {
    console.log(error);
    setTimeout(connnectWithRetry, 5000);
  }
};

app.enable("trust proxy");
app.use(
  session({
    store: new RedisStore({
      client: redisClient,
    }),
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 100000,
    },
  }),
);

app.use(express.json());

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", userRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;

  res.status(status).json({
    message: message,
  });
});

connnectWithRetry()
  .then(() => connectToRedis())
  .then(() => {
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  });
