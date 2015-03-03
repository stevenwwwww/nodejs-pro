
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
     
                   var ask=new Ask();
				                  ask.save({problem:p,
				                  	              openid:oid,
				                  	              headimgurl: headimgurl},{
				                                 success:function(data){
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

//对本问题的回复
exports.addReply= function (req, callback){
	            
                 var oid= "";
                 var headimgurl='';
                  if(req.session.userinfo==undefined)  
                 {   oid='ozhyouOzAZpcZoQoqdj7dOPiaYYQ';
                 }else{ 
                 	  oid= req.session.userinfo.openid;
                 	  headimgurl = req.session.userinfo.headimgurl; 
                 }
                 
	              var query = new AV.Query(Ask); //找到前面的评论
					query.equalTo("openid", oid);
					query.first({
					  success: function(ask) {	
							  	if(ask !=undefined) { // 找着了
							  		var QQ      =req.param('QQ'); //得到前端传过来的 系统自定义的 Q的id（数字）
							  		var Qother =req.param('other'); //前端传过来的，自定义评论
						          if(Qother)//如果是自定义评论
						          { 	var   others = ask.get("others");
									  	 if( others.length > 200){  //自定义超过 200个了
									  	 	  others.shift(); 
									  	 	   others.push(  Qother); 	
									  	 	  ask.set('others', others);   
									  	 }else{
									  	 	ask.addUnique("others", Qother); 		
									  	 }
								  	 }else{ //如果是系统固定评论
								  	 	  if(Q > 0  &&  Q<50){
								  	 	     ask.increment('Q'+Q); //系统固定评论Q2自增1
								  	 	  }
								  	 }
								      ask.increment("Totalcount"); //总评论个数								      
								      	      
								      ask.save(null, {
										  success: function(ask) {	
										  	    
										  },
										  error: function(ask, error) {			     
										  }
									});
									
								 }else{	  //没有新评论结果的情况下	
			                    }	
							
						  },
						  error: function(error) {
						    //alert("Error: " + error.code + " " + error.message);
						  }
            });
}




