import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (typeof MONGO_URI !== "string") {
  throw new Error("MONGO_URI is not defined");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export default async function dbConnect(): Promise<typeof mongoose> {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(MONGO_URI as string, {
        bufferCommands: false,
      })
      .then((m) => m);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}
