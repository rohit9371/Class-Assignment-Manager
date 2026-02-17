import mongoose from "mongoose";
 const connectDB =async ()=>{
    mongoose.connection.on('connected', ()=>console.log("Database Connected"))  
    //used to show on console when get connected with db
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "mernauth",   // 👈 FORCE MongoDB to use mernauth DB
    });
 }

 export default connectDB;