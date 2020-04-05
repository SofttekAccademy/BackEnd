var express = require('express'), app=express(), bodyParser = require('body-parser');
var router = express.Router();
var inFunctions = require("./insertServiceFunctions.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



router.post('/',(req,res, next)=>{
	var params = req.body;
	var isParam = params.is;
	inFunctions.mainFunction(isParam).then(function(response){
		res.send(response);
	});
} );
module.exports = router;