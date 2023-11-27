import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const CONNECTION = process.env.CONNECTION || "";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(CONNECTION);
    const db = mongoose.connection;
    db.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });

    db.once("open", () => {
      console.log("Connected to MongoDB Atlas");
    });
  } catch (error) {
    console.error(error);
  }
};

export const closeDatabaseConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log("Closed MongoDB connection");
  } catch (error) {
    console.error(error);
  }
};
