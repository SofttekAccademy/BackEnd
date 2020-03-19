//función que valida el parámetro de entrada.
function validateParam(param){
	var response = false;
	if(param !=null && param!=''&&param.length==5){
		var regex = /^([A-Z, a-z,0-9])*$/
		response= regex.test(param);
	}
	return response;
}
//función que valida si ya hay una registro de hora de entrada o de hora de salida
function validateRecord(){
	
}
//función que consulta los datos del académico y lo concatena con la hora de entrada o salida.
function concatRecordData(){
	
}

//Recibe el registro concatenado, lo inserta y regresa la respuesta o el error en formato JSON
function mainFunction(){
	var prueba = 'Dato de prueba servicio';
	return prueba;
}

module.exports = {
    "validateParam": validateParam,
	"validateRecord":validateRecord,
	"concatRecordData":concatRecordData,
	"mainFunction":mainFunction
}