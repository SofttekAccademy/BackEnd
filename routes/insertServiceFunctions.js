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
//Validate if the record is ready to insert or update or is invalid
async function validateRecord(param){
	var validateResponse = null;
	var isValid = false;
	var dayRegistry =await getDayRegistry(param);
	var dataAcademic = await getAcademicRegistry(param);
	if(dayRegistry!=null&&dayRegistry!=''){
		var outTime = dayRegistry[0]['CHECK_OUT_TIME'];
		if(outTime=='00:00'){
			isValid= await updateData(param);
		}
	}else{
		if(dataAcademic!= null &&dataAcademic!=''){
			isValid= await insertData(param);
		}
	}
	if(isValid){
		validateResponse={name:dataAcademic[0]['NAME'], last_name1:dataAcademic[0]['LASTNAME']};
	}
	
	return new Promise(resolve=>{
		resolve(validateResponse);
	});
	

}

//Return the day registry filter by IS
function getDayRegistry(academicIS){
	var d = new Date();
	var month = d.getMonth() +1;
	var fecha = d.getDate()+'-'+month+'-'+d.getFullYear();
	var db = dataBaseConection.dataBaseConect();

	db.on('error', console.error.bind(console, 'connection error:'));	
	// define Schema
	var RegistrySchema = createSchema();
	// compile schema to model
	var Registry;
	try{
		var Registry = mongoose.model('REGISTRY');
	}catch(error){
		var Registry = mongoose.model('REGISTRY', RegistrySchema,'REGISTRY');
	}
	return new Promise(resolve=>{
		db.once('open', function() {
			console.log("Connection Successful!");
			var registry = {IS:academicIS, DATE:fecha };
			Registry.find(registry, function (err, result) {
				db.close(function(){
					console.log("Connection close!");
				});
				resolve(result);
			});
			
		});
	});
}

//Return the data associated at the IS parameter
function getAcademicRegistry(academicIS){
	var db = dataBaseConection.dataBaseConect();
	db.on('error', console.error.bind(console, 'connection error:'));
		// define Schema
		var AcademicSchema = createAcademicSchema();
		// compile schema to model
		var Academy;
		try{
			Academy = mongoose.model('academy_data');
		}catch(err){
			Academy = mongoose.model('academy_data', AcademicSchema,'academy_data');
		}
		// documents array
		var registry = {IS: academicIS};
		return new Promise(resolve=>{
		db.once('open', function() {
			console.log("Connection Successful!");
			Academy.find(registry, function (err, result) {
					console.log(result);
					db.close(function(){
						console.log("Connection close!");
					});
					resolve(result);
				});
		
		});
	});
}
//Generate the document ready to insert into DataBase.
function concatRecordData(academicIS){
	var concatResponse = null;
	var d = new Date();
	var hora = d.getHours()+':'+d.getMinutes();
	var month = d.getMonth() +1;
	var fecha = d.getDate()+'-'+month+'-'+d.getFullYear();
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
	var Schema = mongoose.Schema;
	var createdSchema = new Schema({
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
 
	var RegistrySchema = createSchema();
		// compile schema to model
		// define Schema
	var Registry;
	try{
		Registry = mongoose.model('REGISTRY');
	}catch(error){
		Registry = mongoose.model('REGISTRY', RegistrySchema,'REGISTRY');
	}
		// documents array
	var registry = concatRecordData(paramIS);

	return new Promise(resolve=>{
		db.once('open', function() {
			console.log("Connection Successful!");
			Registry.collection.insert(registry, function (err, docs) {
				db.close(function(){
					console.log("Connection close!");
				});
				var respuesta=false;
				if (err){ 
				} else {
					respuesta= true;
				}
				resolve(respuesta);
			});
		});
	});

}

//Update the record 
function updateData(ParamIs){

	var d = new Date();
	var hora = d.getHours()+":"+d.getMinutes();
	var month = d.getMonth() +1;
	var fecha = d.getDate()+'-'+month+'-'+d.getFullYear();
	var db = dataBaseConection.dataBaseConect();
	db.on('error', console.error.bind(console, 'connection error:'));
	var RegistrySchema = createSchema();
	// compile schema to model
	var Registry;
	try{
		var Registry = mongoose.model('REGISTRY', RegistrySchema, 'REGISTRY');
		
	}catch(err){
		var Registry = mongoose.model('REGISTRY');
	}
	
	// documents array
	var query = {IS:ParamIs, DATE:fecha};
	db.once('open', function() {
		console.log("Connection Successful!");
		// define Schema
		
		return new Promise(resolve=>{
			Registry.collection.update(query, { $set: {CHECK_OUT_TIME: hora }},function (err, docs) {
			var response = false;
				if (err){ 
					return false;
				} else {
					response= true;
				}
			db.close(function(){
				console.log("Connection close!");
			});
			resolve(response);
			});
		});
	});

	return true;
}

//Main function process the parameter and return the response on JSON format
async function mainFunction(param){
	var response = null;
	
	if(validateParam(param)){
		var validateResponse = await validateRecord(param);
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

	return new Promise(resolve=>{
		resolve(response);
	});
}

module.exports = {
	"mainFunction":mainFunction
}