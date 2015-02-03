var APPID="wxf73006c3c589a36c";
var SECRET="264039157e9c9e36529c501fb45adad8";
var TOKEN="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
var CODE="https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code"
var USERINFO="https://api.weixin.qq.com/sns/userinfo?lang=zh_CN"


var https = require('https');

 exports.token=function(cb){
  var tokenURL=TOKEN+"&appid="+APPID+"&secret="+SECRET;
 // console.log()
  gethttps(tokenURL,cb);
}

exports.openid=function(code,cb){
  var codeURL=CODE+"&appid="+APPID+"&secret="+SECRET+"&code="+code;
  gethttps(codeURL,cb);
}

exports.userinfo=function(info,cb){
 info=JSON.parse(info);
  var ACCESS_TOKEN=info.access_token;
  var OPENID=info.openid;
  var userinfoURL=USERINFO+"&access_token="+ACCESS_TOKEN+"&openid="+OPENID;
  //console.log(userinfoURL);
  gethttps(userinfoURL,cb);
}

var gethttps=function(url,cb){
  https.get(url, function(res) {
   res.on('data', function(d) {
    //console.log(d);
    cb(d);
  });

}).on('error', function(e) {
  console.error(e);
});
}