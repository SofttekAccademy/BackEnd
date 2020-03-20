var mongoose = require('mongoose');

//función que genera la conexión a la base de datos
function dataBaseConect(){
   
	var mongoDB = 'mongodb+srv://academy_2020:0402282020@cluster0-9xx19.mongodb.net/academy_checker?retryWrites=true&w=majority';
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(mongoDB);
    var db = mongoose.connection;

    return db;
}


module.exports = {
    "dataBaseConect": dataBaseConect
}