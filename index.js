const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const { authenticate } = require('./middleware/authentication');
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order')


const PORT = 3334

const app = express()

app.use(express.json());
app.use('/auth', authRoute)
app.use('/orders', authenticate, orderRoute)

app.get('/', (req, res) => {
    return res.json({ status: true })
})

async function start () {
	try{
		await mongoose.connect('mongodb://localhost:27017')
	
		mongoose.connection.on("connected", () => {
			console.log("Connected to MongoDB Successfully");
		});
		
		mongoose.connection.on("error", (err) => {
			console.log("An error occurred while connecting to MongoDB");
			console.log(err);
		});
		
		app.listen(PORT, () => {
			console.log('Listening on port, ', PORT)
		})
	}catch(e){
		console.log(e)
	}
}

start();