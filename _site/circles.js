"use strict";

function e (e){
	return document.getElementById(e);
}
var canvas = e('c');
var client = {x:window.innerWidth-16, y:window.innerHeight-16};
canvas.width = client.x;
canvas.height = client.y;
var numcircles = 200*(client.x/client.y);
var ctx = canvas.getContext('2d');
var right = true;
var bottom = false;
var v = new Date("Feb 14");
var d = new Date();
var valentine = false;
if (d.getMonth() === v.getMonth() && d.getDate() === v.getDate()) {
	valentine = true;
};

window.addEventListener('resize', function(e){
	client = {x:window.innerWidth-16, y:window.innerHeight-16}
	canvas.width = client.x;
	canvas.height = client.y;
});

var Circle = function (point, s, ctx, color){
	this.x = point.x;
	this.y = point.y;
	this.point = point;
	this.scale = s;
	this.size = 50*this.scale;
	this.ctx = ctx;
	this.color = (typeof color === 'undefined')?"blue":color;
};

Circle.prototype.render = function() {
	this.x += right?0.1:-0.1;
	this.y += bottom?0.1:-0.1;
	this.ctx.fillStyle = this.color;
	this.ctx.beginPath();
	this.ctx.arc(this.x*this.scale, this.y*this.scale, this.size, 0, 2*Math.PI);
	this.ctx.fill();
};

var Heart = function (point, s, ctx, color){
	this.x = point.x;
	this.y = point.y;
	this.point = point;
	this.scale = s;
	this.size = 50*this.scale;
	this.ctx = ctx;
	this.color = (typeof color === 'undefined')?"blue":color;
};

Heart.prototype.render = function() {
	this.x += right?0.1:-0.1
	this.y += bottom?0.1:-0.1;
	this.ctx.fillStyle = this.color;
	this.ctx.beginPath();
	this.ctx.arc(this.x*this.scale, this.y*this.scale, this.size, 0, 2*Math.PI);
	this.ctx.arc((this.x-80)*this.scale, (this.y)*this.scale, this.size, 0, 2*Math.PI);
	this.ctx.moveTo((this.x-120)*this.scale, (this.y+30)*this.scale);
	this.ctx.lineTo((this.x+40)*this.scale, (this.y+30)*this.scale);
	this.ctx.lineTo((this.x-40)*this.scale, (this.y+100)*this.scale);
	this.ctx.fill();
};

var circles = [];
function generate(){
	var point = {x:Math.random()*(client.x), y:Math.random()*(client.y)};
	return !valentine?
	new Circle(point, Math.random()*(5-0.5+1)+0.5, ctx, 
		"rgba("+(Math.random()*255|0)+","+(Math.random()*255|0)+","+(Math.random()*255|0)+","+(Math.random()*(0.9 - 0.2)+0.2)+")"):
	new Heart({x:(Math.random()*(client.x*2)|0)-client.x, 
		y:(Math.random()*(client.y*2)|0)-client.y}, 
		Math.random()*(5-0.5+1)+0.5, ctx, 
		"rgba("+(Math.random()*255|0)+","+(Math.random()*255|0)+","+(Math.random()*255|0)+","+(Math.random()*1)+")");
}

function circle (point, scale, ctx, color) {
	var size = 50*scale;
	return function() {
		point.x += right?0.1:-0.1;
		point.y += bottom?0.1:-0.1;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(point.x*scale, point.y*scale, size, 0, 2*Math.PI);
		ctx.fill();
	}
}

while(circles.length < numcircles){
	circles.push(generate());
}

function render(t){
	if ((Math.random()*1000|0) == 42) {
		right = !right;
	}
	if ((Math.random()*1000|0) == 24) {
		bottom = !bottom;
	}
	ctx.clearRect(0, 0, client.x, client.y);
	for (var i = 0; i < circles.length; i++) {
		if ((circles[i].x > client.x) || (circles[i].x < -circles[i].size)) {
			circles[i] = generate();
		}

		if ((circles[i].y > client.y) || (circles[i].y < -circles[i].size)) {
			circles[i] = generate();
		}
		circles[i].render();
	}
}

function frame (t){
	window.requestAnimationFrame(frame);
	render(t);
}
window.requestAnimationFrame(frame);

function dl(){
	var dl = document.createElement('a');
	//ctx.fillStyle = "white";
	//ctx.fillRect(0, 0, client.x, client.y);
	dl.href = canvas.toDataURL();
	dl.download = 'dl.png';
	document.body.appendChild(dl);
	dl.click();
	document.body.removeChild(dl);
}