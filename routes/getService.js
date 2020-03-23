var express = require('express'), app=express(), bodyParser = require('body-parser');
var router = express.Router();
var inFunctions = require("./getServiceFunctions.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



router.post('/',(req,res, next)=>{
	
	var params = req.body;
	var dateRegister = params.date;
	inFunctions.mainFunction(dateRegister).then(function(response){
		res.send(response);
	});
		
} );

module.exports = router;