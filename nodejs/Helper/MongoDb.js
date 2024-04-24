const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/testMini')
    .then(() => { })
    .catch((err) => console.error(err));

mongoose.connection.on('connected', function () {
    console.log('Mongoose connection successful');
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});
