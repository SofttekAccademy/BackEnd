var dataBaseConection = require("./databaseConection.js");
var mongoose = require('mongoose');

//Function to validate the function parameter
function validateParam(param){
	var response = false;
	if(param !=null && param!=''&&param.length==5){
		var regex = /^([A-Z, a-z,0-9])*$/
		response= regex.test(param);
	}
	return response;
}
//función que valida si ya hay una registro de hora de entrada o de hora de salida y llama a 
//insertData o a updateData en caso que sea requerido
//Regresa JSON con el nombre y apellidos del usuario, si hay error regresa null
function validateRecord(param){
	var validateResponse;
	//Ejemplo de respuesta
	validateResponse={name:'Carlos', last_name1:'Pacheco', last_name2:'Chavez'};
	return validateResponse;

}
//Generate the document ready to insert into DataBase.
function concatRecordData(academicIS){
	var concatResponse = null;
	var d = new Date();
	var hora = d.getHours()+":"+d.getMinutes();
	var month = d.getMonth() +1;
	var fecha = d.getDate()+"-"+month+"-"+d.getFullYear();
	concatResponse={
		IS:academicIS,
		CHECK_IN_TIME:hora,
		DATE: fecha
	}
	return concatResponse;
}

//Generate the schema to insert reistry on database
function createSchema(){
	var createdSchema = mongoose.Schema({
		IS: String,
		CHECK_IN_TIME: String,
		CHECK_OUT_TIME: String,
		DATE: String
	});
	return createdSchema;
}

//Insert the collection generate on concatRecordFunction
function insertData(paramIS){
	var db = dataBaseConection.dataBaseConect();
	db.on('error', console.error.bind(console, 'connection error:'));
 
	db.once('open', function() {
		console.log("Connection Successful!");
		// define Schema
		var RegistrySchema = createSchema();
		// compile schema to model
		var Registry = mongoose.model('REGISTRY', RegistrySchema, 'REGISTRY');
		// documents array
		var registry = concatRecordData(paramIS);
	
		Registry.collection.insert(registry, function (err, docs) {
		if (err){ 
			return console.error(err);
			return false;
		} else {
			return true;
		}
		db.close();
		});
		
	});

}

//Función que actualiza el dato si es la hora de la salida
function updateData(){

}

//Main function process the parameter and return the response on JSON format
function mainFunction(param){
	var response = null;
	
	if(validateParam(param)){
		var validateResponse = validateRecord(param);
		if(validateResponse==null){
			response={code: "x002", description:"No se ha podido insertar el registro" };
		}else{
			response = {is:param,
				name:validateResponse.name, 
				lastname_1:validateResponse.last_name1,
				lastname_2:validateResponse.last_name2,
				status:'ok'
			};
		}

	}else{
		response={code: "x001", description:"IS invalido" };
	}
	return response;
}

module.exports = {
    "validateParam": validateParam,
	"validateRecord":validateRecord,
	"concatRecordData":concatRecordData,
	"mainFunction":mainFunction,
	"insertData" : insertData
}