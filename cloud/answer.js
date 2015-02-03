var Answer=AV.Object.extend("answer");
exports.getAnswer=function(askid,callback){
	var sql="select count(*),content from answer where askid='"+askid+"'";
	console.log(sql);
  AV.Query.doCloudQuery(sql, {
  success: function(result){
    var results = JSON.stringify(result.results);
    results=JSON.parse(results);
    var rs={};
    for(var o in results){
    	var k=results[o].content;
    	console.log(k)
    	if( k in rs){
                     eval("rs."+k+"++");
    	}else{
                    eval("rs."+k+"="+1);
    	}
    }
    console.log(rs);
    console.log(result.count);
    callback(result.count,rs) ;
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