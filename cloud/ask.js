
var Ask = AV.Object.extend("ask");
exports.addAsk= function(req,cb) {
	 
                 var p=req.param('problem');
                 //console.log(req.session.userinfo);
                 var oid= "";
                 //if(! global.DEBUG)  
                 oid= req.session.userinfo.openid;
                 //if(global.DEBUG)  oid='ozhyouOzAZpcZoQoqdj7dOPiaYYQ';
                 
                  
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





