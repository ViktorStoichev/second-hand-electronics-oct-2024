import mongoose from "mongoose";
const url = 'mongodb://localhost:27017';

export default function mongooseInit() {
    mongoose.connect(url, { dbName: 'second-hand-electronics' })
    mongoose.connection.on('connected', () => console.log('Connected to database!'));
    mongoose.connection.on('error', (err) => console.log('Failed to connect to database!' + err));
    mongoose.connection.on('disconnect', () => console.log('Disconnected from database!'));
}