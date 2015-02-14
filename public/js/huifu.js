
$(function(){ 
 $('.control-label a').click(function(){
  $(this).parent().each(function () {//移除其余非点中状态
         $('.control-label a').removeClass("special_color");
        });
        $(this).addClass("special_color");//给所点中的增加样式
 $('#fullname').val($(this).text());//输出所点的a的内容
 })

 var askid=$("#askid").val();
$.ajax( {    		
    url:'/getans',		
    type:'post',    	
    data:{askid:askid},
    dataType:'json',    		
    success:function(data) {    	
        var anslist=$("#anslist");
         var h="<div class='head-img'><img src='img/head.png'/></div><div class='div-line'></div>";
        var b="<button name='btn'>删除</button>";
        for(var i=0;i<data.length;i++){
        	var d=data[i];
                var c="<span class='sp-txt'>"+d.content+"</span>";
                var t="<span class='sp-time'>"+d.updatedAt+"</span>";
                anslist.append(h).append(c).append(t).append(b);

        }
     }		
}); 


  $.ajax( {       
    url:'/countans',    
    type:'post',      
    data:{askid:askid},
    dataType:'json',        
    success:function(rs) {        
       var sdiv=$("#anscount");  
       sdiv.find(".main a").text(rs.count);
       var data=rs.data;
       var i=1;
       /* $.each(data,function(k,v){
       	 var b="<button id='b"+i+++"'> "+k+"*"+v+"</button>";
                sdiv.append(b);   
       }) */
     
     }    
}); 
})
