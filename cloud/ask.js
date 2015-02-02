 var Ask = AV.Object.extend("ask");
exports.addAsk= function(req,res) {
                 var p=req.param('problem');
                 console.log(req.session.userinfo);
                 var wid=req.session.userinfo.openid;
                 console.log(wid);
                  var ask=new Ask();
                  ask.save({problem:p,openid:wid},{
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

