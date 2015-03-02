var Answer=AV.Object.extend("answer");
exports.countAnswer=function(askid,callback){
	var sql="select count(*),content from answer where askid='"+askid+"'";
	console.log(sql);
  AV.Query.doCloudQuery(sql, {
  success: function(result){
  	console.log("====query ");
    var results = JSON.stringify(result.results);
    results=JSON.parse(results);
     console.log(results);
    console.log(result.count);
    var rs={};
    for(var o in results){
    	var k=results[o].content;
    	console.log(k)
         if(k=='')continue;
    	if( k in rs){
                     eval("rs."+k+"++");
    	}else{
                    eval("rs."+k+"=1");
    	}
    }
    console.log(rs);
    callback(result.count,rs) ;
  }
});
}

exports.getAnswer=function(askid,callback){
  var sql="select count(*),* from answer where askid='"+askid+"'";
  //console.log(sql);
  AV.Query.doCloudQuery(sql, {
  success: function(result){
    // console.log("====query ");
     var results = JSON.stringify(result.results);
     results=JSON.parse(results);
     //console.log(results.get);
     console.log(result.count);
     var rs={};
    for(var o in results){
    	var k=results[o].content;
    	//console.log(k)
        if(k=='')continue;
    	if( k in rs){
             eval("rs."+k+"++");
    	}else{
           //  eval("rs."+k+"=1");
    	}
    }
     console.log(rs);
     callback(result.count,rs) ;
  }
});
}

exports.getNowAnswer=function(userinfo,cb){
               var openid=userinfo.openid;
                var sql="select * from ask where openid='"+openid+"' limit 1 order by -updatedAt ";
                console.log(sql);
                AV.Query.doCloudQuery(sql, {
                                  success: function(result){
                                                var results = JSON.stringify(result.results);
                                                results=JSON.parse(results);
                                                console.log(results[0])
                                                cb(results[0]) ;
                                  }
                });
}


exports.addAns= function(req,res) {
                 var c=req.param('content');     
                 var aid=req.param('askid');
                   var oid=req.param('oid');
                  var answer=new Answer();
                  answer.save({content:c,askid:aid,openid:oid},{
                                 success:function(object){
                                 	console.log(object);
                                                 res.end();
                                 }

                 });
}

