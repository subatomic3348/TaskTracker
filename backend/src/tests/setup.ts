import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import "./redisMock";
import dotenv from "dotenv";
dotenv.config();

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
    console.log("test db connected:", uri);
  await mongoose.connect(uri);
});

afterEach(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});
