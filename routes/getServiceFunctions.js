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
function getRecords(param){
	
	console.log(param);

	var listaResponse=[{
		name : "Juan",
		lastname_1 : "Diaz",
		lastname_2 : "Chavez",
		arrival : "09:05",
		leave : "18:06"
	},
	{
		name : "Jorge",
		lastname_1 : "Mondragon",
		lastname_2 : "Vazques",
		arrival : "09:00",
		leave : "18:00"
	},
	{
		name : "Magali",
		lastname_1 : "Mendoza",
		lastname_2 : "Lopez",
		arrival : "08:30",
		leave : "18:30"
	}];

return listaResponse;
	
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