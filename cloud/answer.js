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

exports.getNowAnswer=function(openid,cb){
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

exports.myans=function(userinfo,res){
    var openid=userinfo.openid;
    var img=userinfo.headimgurl;
             if (img==''){
                 img="img/head.png";//default
             }
    getNowAnswer(openid,function(data){
        var askid=data.objectId;
        var p=data.problem;
         getAnswer(askid,function(count,data){
            res.render('camelia-page印象墙02', { count:count,data:data,askid:askid,p:p,img:img});
        });
     });
}