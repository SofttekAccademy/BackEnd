var express = require('express'), app=express(), bodyParser = require('body-parser');
var router = express.Router();
var inFunctions = require("./getServiceFunctions.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



router.get('/',(req,res, next)=>{
	
	var params = req.body;
	var dateRegister = params.date;
	var datoResponse = inFunctions.mainFunction(dateRegister);
	res.send({datoResponse});
} );

module.exports = router;