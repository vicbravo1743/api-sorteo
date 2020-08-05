import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/sorteo4', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.on('error', () => {
    console.log('Error trying connecting to database');
    process.exit();
})