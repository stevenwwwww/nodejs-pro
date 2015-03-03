
var Ask = AV.Object.extend("ask");
exports.addAsk= function(req,cb) {
	 
                 var p=req.param('problem');
                 //console.log(req.session.userinfo);
                 var oid= "";
                 var headimgurl='';
                  if(req.session.userinfo==undefined)  
                 {   oid='ozhyouOzAZpcZoQoqdj7dOPiaYYQ';
                 }else{ 
                 	  oid= req.session.userinfo.openid;
                 	  headimgurl = req.session.userinfo.headimgurl; 
                 }
                 //if(global.DEBUG)  oid='ozhyouOzAZpcZoQoqdj7dOPiaYYQ';
                 

                  var ask=new Ask();
                  ask.save({problem:p,
                  	              openid:oid,
                  	              headimgurl: headimgurl},{
                                 success:function(data){
                                 	//console.log(data);
                                                 //res.end();
                                                 cb(data);
                                 }

                 });
}

exports.delAsk= function(req,cb) {
	            
                 var objid=req.param('objid');
                 //console.log(req.session.userinfo);
                 var oid= "";
                  if(req.session.userinfo==undefined)  
                 {   oid='ozhyouOzAZpcZoQoqdj7dOPiaYYQ';
                 }else{ 
                 	  oid= req.session.userinfo.openid;
                 }     
                 
                var query = new AV.Query("answer");
               query.equalTo("objectId", objid);
               query.destroyAll({
				   success: function(){
				   	  cb("ok");
				 },
				   error: function(err){
				     cb("fail");
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

function AddAnswer(res){
	var ASK = AV.Object.extend("ask"); 
	 var query = new AV.Query(ASK);
			query.equalTo("objectId", "54f57155e4b0c976f0206466");
			query.first({
			  success: function(ask) {
                  var x= ask.get("others").length;				  
			      ask.increment("Q1"); //系统固定评论Q1自增1
			      ask.increment("Q2"); //系统固定评论Q2自增1
			      ask.addUnique("others", "用户自定义评论1"); 			      
			      ask.save(null, {
					  success: function(ask) {			    
					  },
					  error: function(ask, error) {			     
					  }
				});
			  },
			  error: function(error) {
			    //alert("Error: " + error.code + " " + error.message);
			  }
			}); 
}




