import { mongoose } from "mongoose";

async function initDB()
{
    if (mongoose.connections[0].readyState) {
        console.log("already connected")
        return
    }
    mongoose.connect(process.env.MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on('connected', () =>
    {
        console.log('Connect to mongodb');
    })
    mongoose.connection.on('error', (err) =>
    {
        console.log('mongo ' + err);
    })
}
export default initDB