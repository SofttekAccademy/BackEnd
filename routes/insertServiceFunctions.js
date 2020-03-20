var dataBaseConection = require("./databaseConection.js");
var mongoose = require('mongoose');

//Function to validate the function parameter
function validateParam(param){
	var response = false;
	if(param !=null && param!=''&&(param.length==5||param.length==4)){
		var regex = /^([A-Z, a-z,0-9])*$/
		response= regex.test(param);
	}
	return response;
}
//Validate if the record is 
function validateRecord(param){
	var validateResponse = null;
	var isValid = false;
	var dayRegistry = getDayRegistry(param);
	if(dayRegistry!=null&&dayRegistry!=''){
		if(dayRegistry.CHECK_OUT_TIME=='00:00'){
			isValid=updateData(dayRegistry);
		}
	}else{
		isValid= insertData(param);
	}
	if(isValid){
		var dataAcademic = getAcademicRegistry(param);
		validateResponse={name:dataAcademic.NAME, last_name1:dataAcademic.LASTNAME};
	}
	
	return validateResponse;

}

//Return the day registry filter by IS
function getDayRegistry(academicIS){
	var d = new Date();
	var month = d.getMonth() +1;
	var fecha = d.getDate()+"-"+month+"-"+d.getFullYear();
	var db = dataBaseConection.dataBaseConect();

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log("Connection Successful!");
		// define Schema
		var RegistrySchema = createSchema();
		// compile schema to model
		var Registry = mongoose.model('REGISTRY', RegistrySchema,'REGISTRY');
		// documents array
		var registry = {IS:academicIS, DATE:fecha };
	
		Registry.find(registry, function (err, result) {
			console.log(result);
			return result;
			db.close();
		});
		
	});
}

//Return the data associated at the IS parameter
function getAcademicRegistry(academicIS){
	var db = dataBaseConection.dataBaseConect();
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log("Connection Successful!");
		// define Schema
		var AcademicSchema = createAcademicSchema();
		// compile schema to model
		var Academy = mongoose.model('academy_data', AcademicSchema,'academy_data');
		// documents array
		var registry = {IS: academicIS};
	
		Academy.find(registry, function (err, result) {
				console.log(result);
				return(result);
				db.close();
			});
	
	});
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
		CHECK_OUT_TIME:'00:00',
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

//Generate the schema to Academic 
function createAcademicSchema(){
	var createdSchema = mongoose.Schema({
		IS: String,
		NAME: String,
		LASTNAME: String
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
			return false;
		} else {
			return true;
		}
		db.close();
		});
		
	});

}

//Función que actualiza el dato si es la hora de la salida
function updateData(ParamIs){

	var d = new Date();
	var hora = d.getHours()+":"+d.getMinutes();

	var db = dataBaseConection.dataBaseConect();
	db.on('error', console.error.bind(console, 'connection error:'));
 
	db.once('open', function() {
		console.log("Connection Successful!");
		// define Schema
		var RegistrySchema = createSchema();
		// compile schema to model
		var Registry = mongoose.model('REGISTRY', RegistrySchema, 'REGISTRY');
		// documents array
		var query = {IS:ParamIs};
	
		Registry.collection.update(query, { $set: {CHECK_OUT_TIME: hora }},function (err, docs) {
		if (err){ 
			return false;
		} else {
			return true;
		}
		db.close();
		});
		
	});

	return true;
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
	"insertData" : insertData,
	"getDayRegistry":getDayRegistry,
	"getAcademicRegistry":getAcademicRegistry,
	"updateData":updateData

}