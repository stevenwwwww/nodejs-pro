
$(function(){ 
 $('.control-label a').click(function(){
  $(this).parent().each(function () {//移除其余非点中状态
         $('.control-label a').removeClass("special_color");
        });
        $(this).addClass("special_color");//给所点中的增加样式
 $('#fullname').val($(this).text());//输出所点的a的内容
 })



function doAddMore(fatherid){
   var askid=$("#askid").val();
 
	$.ajax( {
	    url:'/getans',		
	    type:'post',    	
	    data:{askid:askid},
	    dataType:'json',    		
	    success:function(data) {    	
	           addMoreHTML(fatherid, data);
	     }		
	}); 
}



function  addMoreHTML(fatherid, data){
       var anslist=$("#"+fatherid+"");
         var h="<div class='head-img'><img src='img/head.png'/></div><div class='div-line'></div>";
        
        for(var i=0;i<data.length;i++){
        	var d=data[i];
        	
        	
        	    var Tstr = (getDateDiff(d.updatedAt));
        	    
        	    
                var c="<span class='sp-txt'>"+d.content+"</span>";
                var t="<span class='sp-time'>"+ Tstr +"</span>";
                var b="<button class='btnDel' replyid='"+d.objectId+"'>删除xxxx</button>";                
                anslist.append(h).append(c).append(t).append(b);               
 	    }
 	    
             $(".btnDel").click(function(){
               	doDel($(this).attr('replyid'));               	
               });
 
}

function getDateDiff(d){     
    var now = new Date().getTime();  
     d=d.replace('T',' ');
     d=d.replace('Z',' ');
     d=d.substr(0,d.indexOf('.'));
    var diffValue = now - Date.parse(d.replace(/-/g,'/').replace(/：/g,":"));  
    if(diffValue < 0){       
        return "";      
    }     
    var minute = 1000 * 60;    
    var hour = minute * 60;    
    var day = hour * 24;   
    var halfamonth = day * 15;   
    var month = day * 30;   
    var monthC =diffValue/month;     
    var weekC =diffValue/(7*day);     
    var dayC =diffValue/day;     
    var hourC =diffValue/hour;    
    var minC =diffValue/minute;         
    if(monthC>=1){      
        result=parseInt(monthC) + "个月前";      
    }else if(weekC>=1){  
        result=parseInt(weekC) + "个星期前";      
    }else if(dayC>=1){      
        result= parseInt(dayC) +"天前";      
    }else if(hourC>=1){      
        result= parseInt(hourC) +"个小时前";     
    }else if(minC>=1){      
        result= parseInt(minC) +"分钟前";      
    }else{  
        result="";      
    }   
    return result;    
} 


function doDel(objid){
	//alert(objid);
  	var url='/del?objid=' + objid; 	
    $.ajax( {       
		    url: url,
		    type:'get',   
			success:function(rs) { 
			  	  alert(rs);
			  	 // $(".btnDel [replyid="+objid+"]").remove();
			}}  );	
 }
 
   
   doAddMore("anslist");
   
    $('#showmore').click(function(){ 
		  doAddMore("showmore");
	  
   		
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
