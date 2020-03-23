var dataBaseConection = require("./databaseConection.js");
var mongoose = require('mongoose');
//Validate the param.
function validateParam(param){
	var RegExPattern = /^\d{1,2}\-\d{1,2}\-\d{2,4}$/;
	if ((param.match(RegExPattern)) && (param!='')) {
		return true;
	} else {
		return false;
	}
	
}

//Generate the schema for database
function createSchema(){
	var createdSchema = mongoose.Schema({
		IS: String,
		CHECK_IN_TIME: String,
		CHECK_OUT_TIME: String,
		DATE: String
	});
	return createdSchema;
}

//Get all the records of the selected day
function getRecords(param){
		var db = dataBaseConection.dataBaseConect();
		var RegistrySchema = createSchema();
		var Registry;
		try{
			Registry = mongoose.model('REGISTRY');
		}catch(error){
			Registry = mongoose.model('REGISTRY', RegistrySchema,'REGISTRY');
		}
			
		var registry = {DATE:param};
		db.on('error', console.error.bind(console, 'connection error:'));

		return new Promise(resolve=>{
			db.once('open', function() {
				console.log("Connection Successful!");
				Registry.find(registry, function(err,res){
					db.close(function(){
						console.log("Connection close!");
					});
					resolve(res);
				});
			});
		});	
 		
}

//Regresa todos los registros encontrados o el error en formato JSON
async function mainFunction(param){
	var response = null;
	if(validateParam(param)){
		var validateResponse = await getRecords(param);
		if(validateResponse==null){
			response={code: "x002", description:"No hay registro" };
		}else{
			response = validateResponse;
		}

	}else{
		response={code: "x001", description:"Fecha invalida" };
	}
	return new Promise(resolve=>{
		resolve( response);
	});

	
}

module.exports = {
	"mainFunction":mainFunction
}