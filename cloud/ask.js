 var Ask = AV.Object.extend("ask");
exports.addAsk= function(req,res) {
                 var p=req.param.problem;
                  var ask=new Ask();
                  ask.save({problem:'what'},{
                                 success:function(object){
                                 	console.log(object);
                                                 res.end();
                                 }

                 });
}

exports.allAsk=function(callback){
	var sql="select * from ask ";
	console.log(sql);
  AV.Query.doCloudQuery(sql, {
  success: function(result){
    var results = result.results;
    callback(results) ;
  }
});
}

