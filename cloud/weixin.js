var APPID="wxf73006c3c589a36c";
var SECRET="264039157e9c9e36529c501fb45adad8";
var TOKEN="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
var CODE="https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code"
var USERINFO="https://api.weixin.qq.com/sns/userinfo?lang=zh_CN"

var https = require('https');

var options = {
  hostname: 'api.weixin.qq.com',
  port: 443,
  path: '/',
  method: 'GET'
};

 exports.token=function(cb){
  var tokenURL=TOKEN+"&appid="+APPID+"&secret="+SECRET;
  https.get(tokenURL, function(res) {
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);

  res.on('data', function(d) {
    console.log(JSON.parse(d).access_token);
    cb(JSON.parse(d).access_token);
  });

}).on('error', function(e) {
  console.error(e);
});

}

exports.openid=function(code,cb){
  var codeURL=CODE+"&appid="+APPID+"&secret="+SECRET+"&code="+code;
  console.log(codeURL);
  https.get(codeURL, function(res) {
   res.on('data', function(d) {
    console.log(d);
    cb(d);
  });

}).on('error', function(e) {
  console.error(e);
});

}

exports.userinfo=function(cb){
  var ACCESS_TOKEN="";
  var OPENID=""
  var userinfoURL=USERINFO+"&access_token="+ACCESS_TOKEN+"&openid="+OPENID;
  console.log(userinfoURL);
}