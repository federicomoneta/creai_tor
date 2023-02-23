import mongoose from "mongoose"

const connectDB = (url) => {
    mongoose.set('strictQuery', true)

    mongoose.connect(url)
    .then(() => console.log("Successfully connectd to mongoDB"))
    .catch((e) => console.log("Nao nao --> ", e))
}

export default connectDB