import mongoose from 'mongoose'

export const connectDb = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_DB_URI)
      console.log(`MongoDB connected: ${conn.connection.host}`)  
    } catch (error) {
        console.log("Error connecting to MONGODB", error.message)
        process.exit(1)
    } 
}
