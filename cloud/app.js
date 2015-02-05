// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var ejs=require('ejs');
var app = express();


var ask = require("cloud/ask.js");
var answer = require("cloud/answer.js");
var wx = require("cloud/weixin.js");

//
var AV = require('avoscloud-sdk').AV;
var appid="60lgevf1m41oqglmstu8zpdkofyz2rtznv1jwcjd8rtm22gx";
var key="lt3kzq1squmh84rzvv0s0gbvqzv72qgjukfx44dr9klg1z14";
 AV.initialize(appid, key);

// App 全局配置
app.set('views','public');   // 设置模板目录
//app.set('view engine', 'ejs');    // 设置 template 引擎
app.engine('.html',ejs.__express);  
app.set('view engine', 'html');  
app.use(express.bodyParser());    // 读取请求 body 的中间件
app.use(express.cookieParser());
app.use(express.session({secret:'weixin'}));



//menu
app.get("/myask",function(req,res){
      var userinfo=req.session.userinfo;
      if(userinfo){
          ask.myask(userinfo,res);
      }else{
          var code= req.param('code');
          wx.openid(code,function(data){
          wx.userinfo(data,function(d){
             userinfo=JSON.parse(d);
             req.session.userinfo=userinfo;
             ask.myask(userinfo,res);
          })    
        })
      }
     
});

app.get('/myans',function(req,res){
     var userinfo= req.session.userinfo;
     if(userinfo){
          answer.myans(userinfo,res);
     }else{
          var code= req.param('code');
          wx.openid(code,function(data){
          wx.userinfo(data,function(d){
             userinfo=JSON.parse(d);
             req.session.userinfo=userinfo;
             answer.myans(userinfo,res);
          })    
        }) 
     } 
});

app.post('/allans',function(req,res){
     var askid="54cf6322e4b0fe752de04136";
     answer.getAnswer(askid,function(count,data){
      var rs=JSON.stringify(data);
          res.end(rs);
     });
});




app.post('/addAsk',function(req,res){
     ask.addAsk(req,function(data){
          var d=JSON.stringify(data);
            d=JSON.parse(d);
           req.session.objectid=d.objectId;
           res.redirect("ask?askid="+d.objectId+"&openid="+d.openid);
     });

});

app.get('/ask',function(req,res){
     var askid=req.param('askid');
     var openid=req.param('openid');
     console.log(askid+openid);
     if(req.session.objectid){
          res.render("camelia-page02.html");
     }else{
          answer.getAnswer(askid,function(count,data){
           res.render('camelia-page印象墙', { count:count,data:data,askid:askid});
          });
     }
     
});

app.post('/addAns',function(req,res){
     answer.addAns(req,res);
});

//test
app.get('/allAsk',function(req,res){
     ask.allAsk(function(data){     	
     	var rs=JSON.stringify(data);
     	res.write(rs);
                res.end();
     });
});

app.get('/weixin', function(req, res) {
  var echostr=req.param('echostr');
  res.end(echostr);
});

//weixin
app.get("/token",function(req,res){
        wx.token(function(data){
          res.end(data);
        })
});

app.get("/openid",function(req,res){
        var code= req.param('code');
        wx.openid(code,function(data){
          res.end(data);
        })
});

app.get("/userinfo",function(req,res){
        var code= req.param('code');
        wx.openid(code,function(data){
          wx.userinfo(data,function(d){
             res.end(d);
          })      
        })
});



// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();