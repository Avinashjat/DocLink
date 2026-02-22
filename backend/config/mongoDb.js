import mongoose from "mongoose";


const connectDB = async () =>{

    mongoose.connection.on('connected' , () =>{
        console.log("Database connect")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/DocLink`)

}

export default connectDB