import mongoose from 'mongoose';

export async function connect() {

    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected to MongoDB Successfully');
        });

        connection.on('error', (error) => {
            console.log('Error connecting to MongoDB');
            console.error(error);
        });

    } catch (error) {
        console.log('Something went wrong while connecting to the database');
        console.error(error);
        
    }
}
