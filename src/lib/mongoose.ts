import mongoose from 'mongoose'

let isConnected = false

export const connectToDatabase = async () => {
	mongoose.set('strictQuery', true)

	if (!process.env.MONGODB_URL) {
		return console.log('No MongoDB URI')
	}

	if (isConnected) {
		console.log('MongoDB is already connected')
		return
	}

	try {
		await mongoose.connect(process.env.MONGODB_URL)

		isConnected = true
		console.log('MongoDB connected')
	} catch (err) {
		console.log(err)
	}
}
