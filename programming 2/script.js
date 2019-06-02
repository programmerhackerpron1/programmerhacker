var matrix = [];
var n = 40;
var m = 40;
// stex zangvacnery verjum Arr barov
var grassArr = [];
var grassEaterArr = [];
var grassEaterEaterArr = [];
var grassAryusArr = [];
var grassVishapArr = [];
var side = 20;
function setup() {
    for (var i = 0; i < n; i++) 
    {
        matrix[i] = [];
        for (var j = 0; j < m; j++) 
        {
            var r = random(130)
            var radus;
            if(r<50) radus = 0;
            else if(r<70) radus = 1;
            else if(r<100) radus = 2;
            else if(r<110) radus = 3;
            else if(r<120) radus = 4;
            else if(r<=130) radus = 5;
            matrix[i][j] = radus;
        }
    }
    console.log(matrix);
    frameRate(5);
    createCanvas(n * side + 1, m * side + 1);
    background('#acacac');
//pttvum em matrix mejov u stexcum em object
    for (var y = 0; y < n; y++) {
        for (var x = 0; x < m; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x,y,2);
                grassEaterArr.push(et);               
            }
            else if (matrix[y][x] == 3) {
                var gi = new GrassEaterEater(x,y,3);
                grassEaterEaterArr.push(gi);               
            }
            else if (matrix[y][x] == 4) {
                var ar = new GrassAryus(x,y,4);
                grassAryusArr.push(ar);               
            }
            else if (matrix[y][x] == 5) {
                var vi = new GrassVishap(x,y,5);
                grassVishapArr.push(vi);               
            }
        }
    }
}
//draw uxaki nerkuma
function draw() {
    for (var y = 0; y < n; y++) {
        for (var x = 0; x < m; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
        }
    }
    //kanchum em methodnery
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in grassEaterEaterArr) {
        grassEaterEaterArr[i].move();
        grassEaterEaterArr[i].eat();
        grassEaterEaterArr[i].mul();
        grassEaterEaterArr[i].die();
    }
    for (var i in grassAryusArr) {
        grassAryusArr[i].move();
        grassAryusArr[i].eat();
        grassAryusArr[i].mul();
        grassAryusArr[i].die();
    }
    for (var i in grassVishapArr) {
        grassVishapArr[i].move();
        grassVishapArr[i].eat();
        grassVishapArr[i].mul();
        grassVishapArr[i].die();
    }
}