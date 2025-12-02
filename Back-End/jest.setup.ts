import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

jest.setTimeout(30000);

let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  const { collections } = mongoose.connection;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

// import mongoose from "mongoose";
// import "dotenv/config";

// jest.setTimeout(30000);

// beforeAll(async () => {
//   const mongoUri = "mongodb://localhost:27017/Lingroom_Test";

//   if (mongoose.connection.readyState === 0) {
//     await mongoose.connect(mongoUri);
//   }
// });

// afterEach(async () => {
//   const collections = mongoose.connection.collections;
//   for (const key in collections) {
//     await collections[key].deleteMany({});
//   }
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });
