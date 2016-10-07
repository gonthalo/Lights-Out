
var lienzo = document.getElementById("lienzo");
var pluma = lienzo.getContext("2d");

var tablero = [];
var color1 = [5, 220, 80];
var color2 = [230, 20, 5];
var size = 30
var alto = 5
var ancho = 5

function ynt(num){
	if (num > 0){
		return parseInt(num)
	}
	return parseInt(num) - 1
}

function prod(lis, k){
	for (var ii=0; ii<3; ii++){
		lis[ii] = parseInt(lis[ii]*k);
	}
	return lis;
}

function generar(n, val){
	board = [];
	for (ii=0; ii<n; ii++){
		board[ii] = [];
		for (jj=0;jj<n;jj++){
			board[ii][jj] = val;
		}
	}
	alto = n;
	ancho = n;
	return board;
}

function mover(xx, yy){
	if (!(xx < ancho && xx >= 0 && yy >= 0 && yy < alto)){
		return;
	}
	dpos = [[0, 0], [0, 1], [1, 0], [-1, 0], [0, -1]]
	for (ii=0; ii<5; ii++){
		xp = xx + dpos[ii][0];
		yp = yy + dpos[ii][1];
		if (xp < ancho && xp >= 0 && yp >= 0 && yp < alto){
			tablero[xp][yp] = ! tablero[xp][yp];
		}
	}
}


function rgbstr(lis){
	return "rgb(" + lis[0] + "," + lis[1] + "," + lis[2] + ")";
}

function square(p, q, d, c){
	pluma.fillStyle = c;
	pluma.fillRect(p - d, q - d, 1, 2*d);
	pluma.fillRect(p - d, q + d, 2*d, 1);
	pluma.fillRect(p - d + 1, q - d, 2*d, 1);
	pluma.fillRect(p + d, q - d + 1, 1, 2*d);
}

function block(p, q, d, c){
	for (var tt=0; tt<4; tt++){
		square(p, q, d - tt, rgbstr(prod([c[0], c[1], c[2]], tt*(32 - 5*tt)/51.0)));
	}
	pluma.fillStyle = rgbstr([c[0], c[1], c[2]]);
	pluma.fillRect(p - d + 4, q - d + 4, 2*d - 7, 2*d - 7);
}

function draw(){
	for (ii=0; ii<tablero.length; ii++){
		for (jj=0; jj<tablero[0].length; jj++){
			if (tablero[ii][jj]){
				block(130 + 2*size*ii, 130 + 2*size*jj, size, color1);
			} else {
				//pluma.fillStyle = 'black';
				//pluma.fillRect(100 + 2*size*ii, 100 + 2*size*jj, 2*size, 2*size);
				block(130 + 2*size*ii, 130 + 2*size*jj, size, color2)
			}
		}
	}
}

function instrucciones(){
	pluma.fillStyle = 'black';
	pluma.font = '40px Times';
	pluma.fillText('Mucha suerte ;)', 600 + ancho*size - 120, 350);
	pluma.fillText('Para ganar el juego debe lograr', 500 + ancho*size - 120, 200);
	pluma.fillText('que todas las luces sean', 500 + ancho*size - 120, 250);
	pluma.fillStyle = rgbstr(color1);
	pluma.fillText('verdes', 895 + ancho*size - 120, 250);
}

function reset(){
	dimension = parseInt(document.getElementById('numero1').value);
	tablero = generar(dimension);
	pluma.fillStyle = 'white';
	pluma.fillRect(0, 0, 1200, 600);
	instrucciones();
	draw();
}

function xing(){
	document.getElementById('numero1').value = 4;
	reset();
	tablero[0][0] = true;
	tablero[3][0] = true;
	draw();
}

lienzo.addEventListener("click", function (e){
	var x;
	var y;
	if (e.pageX || e.pageY) {
		x = e.pageX;
		y = e.pageY;
	} else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	x -= lienzo.offsetLeft;
	y -= lienzo.offsetTop;
	console.log(x, y);
	x = ynt((x-100)/2.0/size);
	y = ynt((y-100)/2.0/size);
	console.log(x, y);
	mover(x, y);
	draw();
}, false);

reset();

tablero[0][0] = false;
tablero[3][0] = false;
draw();

//window.setInterval(draw, 10);
