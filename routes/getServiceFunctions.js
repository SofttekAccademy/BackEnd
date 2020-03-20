var dataBaseConection = require("./databaseConection.js");
var mongoose = require('mongoose');
//función que valida el parámetro de entrada.
function validateParam(param){
	var RegExPattern = /^\d{1,2}\-\d{1,2}\-\d{2,4}$/;
	if ((param.match(RegExPattern)) && (param!='')) {
		return true;
	} else {
		return false;
	}
	
}

function createSchema(){
	var createdSchema = mongoose.Schema({
		IS: String,
		CHECK_IN_TIME: String,
		CHECK_OUT_TIME: String,
		DATE: String
	});
	return createdSchema;
}

//Obtiene todos los registros del día seleccionado
function getRecords(param){
	var listResponse={};
	var db = dataBaseConection.dataBaseConect();

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
	var RegistrySchema = createSchema();
	var model = mongoose.model('REGISTRY', RegistrySchema,'REGISTRY');
	console.log("Connection Successful!");

	model.find({
	}, (err, docs) => {
	   if(err){
		   console.log(err)
	   } else{
		 if(docs.length != 0){
			listResponse=docs;
			console.log(docs);
		 }
	   }
	});
});
 	
return listResponse;
	
}

//Regresa todos los registros encontrados o el error en formato JSON
function mainFunction(param){
	var response = null;
	
	if(validateParam(param)){
		var validateResponse = getRecords(param);
		if(validateResponse==null){
			response={code: "x002", description:"No hay registro" };
		}else{
			response = validateResponse;
		}

	}else{
		response={code: "x001", description:"Fecha invalida" };
	}
	return response;
	
}

module.exports = {
    "validateParam": validateParam,
	"getRecords":getRecords,
	"mainFunction":mainFunction
}