function e (e){
	return document.getElementById(e);
}
var canvas = e('c');
client = {x:window.innerWidth-16, y:window.innerHeight-16}
canvas.width = client.x;
canvas.height = client.y;
var numcircles = 200*(client.x/client.y);
var ctx = canvas.getContext('2d');
var right = true;
var bottom = false;
window.addEventListener('resize', function(e){
	client = {x:window.innerWidth-16, y:window.innerHeight-16}
	canvas.width = client.x;
	canvas.height = client.y;
});

window.addEventListener('mousemove', function(e){	
	if (e.x > client.x - client.x/8){
		right = false;
	} else if (e.x < client.x/8) {
		right = true;
	}
	if (e.y > client.y - client.y/8){
		bottom = true;
	} else if (e.y < client.y/8) {
		bottom = false;
	}
});

var Circle = function (point, s, ctx, color){
	this.x = point.x;
	this.y = point.y;
	this.point = point;
	this.size = 50*s;
	this.scale = s;
	this.ctx = ctx;
	this.color = (typeof color === 'undefined')?"blue":color;
};

Circle.prototype.render = function() {
	this.x += right?0.1:-0.1
	this.y += bottom?0.1:-0.1;
	this.ctx.fillStyle = this.color;
	this.ctx.beginPath();
	this.ctx.arc(this.x*this.scale, this.y*this.scale, this.size, 0, 2*Math.PI);
	this.ctx.fill();
};
circles = [];
while(circles.length < numcircles){
	circles.push(new Circle({x:(Math.random()*(client.x*2)|0)-client.x, y:(Math.random()*(client.y*2)|0)-client.y}, Math.random()*(5-0.5+1)+0.5, ctx, "rgba("+(Math.random()*255|0)+","+(Math.random()*255|0)+","+(Math.random()*255|0)+","+(Math.random()*1)+")"));
}

function render(t){
	if ((Math.random()*1000|0) == 42) {
		right = !right;
	}
	if ((Math.random()*1000|0) == 24) {
		bottom = !bottom;
	}
	ctx.clearRect(0, 0, client.x, client.y);
	while(circles.length < numcircles){
		circles.push(new Circle({x:(Math.random()*(client.x*2)|0)-client.x, y:(Math.random()*(client.y*2)|0)-client.y}, Math.random()*(5-0.5+1)+0.5, ctx, "rgba("+(Math.random()*255|0)+","+(Math.random()*255|0)+","+(Math.random()*255|0)+","+(Math.random()*1)+")"));
	}
	for (var i = 0; i < circles.length; i++) {
		circles[i].render();
	}
	circles = circles.filter(function(c){
		if ((c.x > client.x+c.size) || (c.x < 0-c.size) || (c.y > client.y+c.size) || (c.y < 0-c.size)) {
			return false;
		}
		return true;
	});
}

function frame (t){
	window.requestAnimationFrame(frame);
	render(t);
}
window.requestAnimationFrame(frame);

function dl(){
	var dl = document.createElement('a');
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, client.x, client.y);
	dl.href = canvas.toDataURL();
	dl.download = 'dl.png';
	document.body.appendChild(dl);
	dl.click();
	document.body.removeChild(dl);
}