// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();

var ask = require("cloud/ask.js");
var wx = require("cloud/weixin.js");

//
var AV = require('avoscloud-sdk').AV;
var appid="60lgevf1m41oqglmstu8zpdkofyz2rtznv1jwcjd8rtm22gx";
var key="lt3kzq1squmh84rzvv0s0gbvqzv72qgjukfx44dr9klg1z14";
 AV.initialize(appid, key);

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.get('/weixin', function(req, res) {
  var echostr=req.param('echostr');
  res.end(echostr);
});


app.post('/addAsk',function(req,res){
     ask.addAsk(req,res);
});

app.get('/allAsk',function(req,res){
     ask.allAsk(function(data){     	
     	var rs=JSON.stringify(data);
     	res.write(rs);
                res.end();
     });
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

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();
