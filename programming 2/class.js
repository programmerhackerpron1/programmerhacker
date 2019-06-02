class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    //yntruma shrjaka 8 vandakner
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    // bazmanuma azat vandakneri himan vra
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        console.log(newCell, this.multiply);
        if (this.multiply >= 4 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}
class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 8;
    }
    //vorpes method
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    //qayluma
    move() {
        //yntruma vandak
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
            this.energy--;
        }
    }
    eat() {
        var newCell = random(this.chooseCell(1));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }
        else if (this.energy >= 12) {
            this.mul();
        }
        else if (this.energy <= 0) {
            this.die();
        }
        else {
            this.move();
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
    }
    die() {
        //this.energy--;
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1)
            }
        }

    }
}
class GrassEaterEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 10;
    }
    //vorpes method
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    //qayluma
    move() {
        //yntruma vandak
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
            this.energy--;
        }
    }
    eat() {
        var newCell = random(this.chooseCell(2));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 12 && newCell) {
            var newGrassEaterEater = new GrassEaterEater(newCell[0], newCell[1], this.index);
            grassEaterEaterArr.push(newGrassEaterEater);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 8;
        }
    }
    die() {
        //this.energy--;
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in grassEaterEaterArr) {
                if (grassEaterEaterArr[i].x == this.x && grassEaterEaterArr[i].y == this.y) {
                    grassEaterEaterArr.splice(i, 1)
                }
            }
        }
    }
}
class GrassAryus {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 12;
    }
    //vorpes method
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    //qayluma
    move() {
        //yntruma vandak
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
            this.energy--;
        }
        else{
            var newCell = random(this.chooseCell(1));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[this.y][this.x] = 1;
                matrix[newY][newX] = this.index;
                this.y = newY;
                this.x = newX;
                this.energy--;
            }
        }
    }
    eat() {
        var newCell = random(this.chooseCell(3));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            for (var i in grassEaterEaterArr) {
                if (newX == grassEaterEaterArr[i].x && newY == grassEaterEaterArr[i].y) {
                    grassEaterEaterArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 14 && newCell) {
            var newGrassAryus = new GrassAryus(newCell[0], newCell[1], this.index);
            grassAryusArr.push(newGrassAryus);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 12;
        }
    }
    die() {
        //this.energy--;
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in grassAryusArr) {
                if (grassAryusArr[i].x == this.x && grassAryusArr[i].y == this.y) {
                    grassAryusArr.splice(i, 1)
                }
            }
        }
    }
}
class GrassVishap {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 14;
    }
    //vorpes method
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    //qayluma
    move() {
        //yntruma vandak
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
            this.energy--;
        }
    }
    eat() {
        var kalabok = random(10);
        if (kalabok % 2 == 0) {
            var newCell = random(this.chooseCell(4));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
                for (var i in grassVishapArr) {
                    if (newX == grassVishapArr[i].x && newY == grassVishapArr[i].y) {
                        grassVishapArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
                this.energy += 2;
            }
            else {
                var newCell = random(this.chooseCell(1));
                if (newCell) {
                    var newX = newCell[0];
                    var newY = newCell[1];
                    matrix[this.y][this.x] = 0;
                    matrix[newY][newX] = this.index;
                    for (var i in grassArr) {
                        if (newX == grassArr[i].x && newY == grassArr[i].y) {
                            grassArr.splice(i, 1);
                            break;
                        }
                    }
                    this.y = newY;
                    this.x = newX;
                    this.energy += 2;
                }
            }
        }
        else {
            var newCell = random(this.chooseCell(1));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
                this.energy += 2;
            }
            else {
                var newCell = random(this.chooseCell(4));
                if (newCell) {
                    var newX = newCell[0];
                    var newY = newCell[1];
                    matrix[this.y][this.x] = 0;
                    matrix[newY][newX] = this.index;
                    for (var i in grassVishapArr) {
                        if (newX == grassVishapArr[i].x && newY == grassVishapArr[i].y) {
                            grassVishapArr.splice(i, 1);
                            break;
                        }
                    }
                    this.y = newY;
                    this.x = newX;
                    this.energy += 2;
                }
            }
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 16 && newCell) {
            var newGrassVishap = new GrassVishap(newCell[0], newCell[1], this.index);
            grassVishapArr.push(newGrassVishap);
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 14;
        }
    }
    die() {
        //this.energy--;
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in grassVishapArr) {
                if (grassVishapArr[i].x == this.x && grassVishapArr[i].y == this.y) {
                    grassVishapArr.splice(i, 1)
                }
            }
        }
    }
}