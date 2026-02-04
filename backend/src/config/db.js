import mongoose from "mongoose";

const connectDB = async () => {

   const uri = "mongodb+srv://shobhansenoo_db_user:shobhan123@cluster0.gwr8jzb.mongodb.net/CareerTracker?retryWrites=true&w=majority&appName=Cluster0";

  try {
    const conn = await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
