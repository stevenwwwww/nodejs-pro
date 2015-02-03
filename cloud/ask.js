 var Ask = AV.Object.extend("ask");
exports.addAsk= function(req,cb) {
                 var p=req.param('problem');
                 //console.log(req.session.userinfo);
                 var oid=req.session.userinfo.openid;
                //var oid='ozhyouOzAZpcZoQoqdj7dOPiaYYQ';
                 //console.log(oid);
                  var ask=new Ask();
                  ask.save({problem:p,openid:oid},{
                                 success:function(data){
                                 	//console.log(data);
                                                 //res.end();
                                                 cb(data);
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



