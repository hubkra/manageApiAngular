//this file handle connection logic to the mongoDB 

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://127.0.0.1:27017/taskManager';
mongoose.connect(DB_URL, {useNewUrlParser: true}).then(() => {
    console.log('Connected to mongoose successfully');

}).catch((e)=>{
    console.log('Error connecting to mongoose');
    console.log(e);
});



module.exports ={ 
    mongoose
};
