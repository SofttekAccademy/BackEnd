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
//función que consulta los datos del académico genera el documento que se inserta en BD concatenando la hora de entrada o salida.
//Hace uso de validateRecord para validar si es hora de entrada o salida
function concatRecordData(){
	
}

//Función que inserta el dato concatenado si es la hora de entrada
//Hace uso de concatRecordData
function insertData(){

}

//Función que actuaiza el dato si es la hora de la salida
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
	"mainFunction":mainFunction
}