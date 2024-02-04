import mongoose from "mongoose";

const initDB = async () => {
  try {
    await mongoose.connect(
      `mongodb://tirlochan16:password@localhost:27017/tasks`
    );

    console.log("db connection successful");
  } catch (err) {
    console.log(err);
    return "DB connection failed";
  }
};

export default initDB;
