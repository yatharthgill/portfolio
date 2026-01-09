import mongoose from "mongoose";


type ConnectObject = {
    isConnected?: number
}

 
const connection: ConnectObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already Connected")
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "", {})
        connection.isConnected = db.connections[0].readyState

        console.log("Db Connected Successfully")
    } catch (error) {
        console.log("Db Connection Failed", error)
        process.exit(1)
    }

}

export default dbConnect;