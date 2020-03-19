//función que valida el parámetro de entrada.
function validateParam(param){
	var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
	if ((param.match(RegExPattern)) && (param!='')) {
		return true;
	} else {
		return false;
	}
	
}
//Obtiene todos los registros del día seleccionado
function getRecords(){
	
}

//Regresa todos los registros encontrados o el error en formato JSON
function mainFunction(){
   	var prueba = 'Dato de prueba servicio Consulta ';
	return prueba;
	
}

module.exports = {
    "validateParam": validateParam,
	"getRecords":getRecords,
	"mainFunction":mainFunction
}