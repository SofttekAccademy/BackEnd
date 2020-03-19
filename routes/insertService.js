var express = require('express'), app=express(), bodyParser = require('body-parser');
var router = express.Router();
var inFunctions = require("./insertServiceFunctions.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



router.post('/',(req,res, next)=>{
	var params = req.body;
	var isParam = params.is;
	var responseService = inFunctions.mainFunction(isParam);
	res.send(responseService);
} );
module.exports = router;