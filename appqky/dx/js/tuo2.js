var a;
document.onmouseup=function(){
    if(!a)return;
	document.all?a.releaseCapture():window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
	a="";
	};
document.onmousemove=function (d){
	if(!a)return;
	if(!d)d=event;
	a.style.left=(d.clientX-b)+"px";
	//a.style.top=(d.clientY-c)+"px";
	};
function $(o,e){
	a=o;
	document.all?a.setCapture():window.captureEvents(Event.MOUSEMOVE);
	b=e.clientX-parseInt(a.style.left);
	//c=e.clientY-parseInt(a.style.top);
	}