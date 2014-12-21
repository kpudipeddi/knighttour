/*
 * @author: Kishore Pudipeddi (kpudipeddi@gmail.com)
 */

var SIZE = 8;
var NUM_SQUARES = parseInt(SIZE * SIZE);
var BOARD = new Array(NUM_SQUARES);
var PATH = [];
var tourInProgress = false;
var idx = 0;
var menuOpen = false;

var initBoard = function() {
	for(var i=0; i<NUM_SQUARES; i++) {
        BOARD[i] = new Square(i);
    }

	for(var i=0; i<NUM_SQUARES; i++) {
        BOARD[i].setPossibleMoves(calcPossibleMoves(i));
    }
}

var drawBoard = function(id) {
    var e = document.getElementById(id);
    var tdCl;
    var isDark = false;
    var sqName;
    var b = "<table width=\"100%\">";
    for(var i=SIZE-1; i>=0; i--) {
        if(i < SIZE-1) {
            isDark = !isDark;
        }
        b += "<tr>";
        for(var j=0; j<=SIZE-1; j++) {
            sqName = new Square(i*SIZE + j).getFormattedSquare();
            tdCl = (isDark ? "tddark" : "tdlight");
            b += "<td class=" + tdCl + " onclick=\"startTour(" + i + ", " + j + ")\"><img id=\"" + sqName + "\"/></td>";
            isDark = !isDark;
        }
        b += "</tr>";
    }

    b += "</table>";
    e.innerHTML = b;
}

var startTour = function(i,j) {
    if(tourInProgress) {
        return;
    }
    reset();
    tourInProgress = true;
    var n = (i*SIZE + j);
    var sq = new Square(n);
    markSquare(BOARD[n]);
    findTour(BOARD[n]);
    moveKnight();
}

var findTour = function(sq) {
	if(isAllSquaresVisited()) {
		return;
	}
	var moves = BOARD[sq.getNum()].getPossibleMoves();
	orderMoves(moves);
	for(var i=0; i<moves.length; i++) {
		if(!moves[i].isVisited()) {
			markSquare(moves[i]);
			findTour(moves[i]);
			if(!isAllSquaresVisited()) {
				unMarkSquare(moves[i]);
			}
		}
	}
}

var orderMoves = function(moves) {
	/*
	 *  Warnsdorff's rule
	 *  We move the knight so that we always proceed to the square from which the 
	 *  knight will have the fewest onward moves.
	 */
	var temp;
	for(var i=0; i<moves.length; i++) {
		for(var j=i; j<moves.length; j++) {
			if(moves[i].getPossibleMoves().length > moves[j].getPossibleMoves().length) {
				temp = moves[i];
				moves[i] = moves[j];
				moves[j] = temp;
			}
		}
	}
}

var markSquare = function (sq) {
	sq.setIsVisited(true);
	PATH.push(sq);
}

var unMarkSquare = function(sq) {
	sq.setIsVisited(false);
	remove(sq);
}

var isAllSquaresVisited = function() {
	var retVal = true;
	for(var i=0; i<BOARD.length; i++) {
		if(!BOARD[i].isVisited()) {
			retVal = false;
			break;
		}
	}
	return retVal;
}

var printPossibleMoves = function() {
    console.log("Possible moves for each square:");
    for(var i=0; i<NUM_SQUARES; i++) {
        console.log(BOARD[i].toString() + ": " + BOARD[i].getFormattedPossibleMoves());
    }
}

var calcPossibleMoves = function(num) {
    var list = [];
    var nms = parseInt(num % SIZE);
    var sts = parseInt(SIZE * SIZE);
    var stt = parseInt(SIZE * 2);
    if(nms-2 >= 0) {
        if(num-2-SIZE >= 0 && num-2-SIZE <= sts-1) list.push(BOARD[num-2-SIZE]);
        if(num-2+SIZE >= 0 && num-2+SIZE <= sts-1) list.push(BOARD[num-2+SIZE]);
    }
    if(nms-1 >= 0) {
        if(num-1+stt >= 0 && num-1+stt <= sts-1) list.push(BOARD[num-1+stt]);
        if(num-1-stt >= 0 && num-1-stt <= sts-1) list.push(BOARD[num-1-stt]);
    }
    if(nms+1 <= SIZE-1) {
        if(num+1+stt >= 0 && num+1+stt <= sts-1) list.push(BOARD[num+1+stt]);
        if(num+1-stt >= 0 && num+1-stt <= sts-1) list.push(BOARD[num+1-stt]);
    }
    if(nms+2 <= SIZE-1) {
        if(num+2+SIZE >= 0 && num+2+SIZE <= sts-1) list.push(BOARD[num+2+SIZE]);
        if(num+2-SIZE >= 0 && num+2-SIZE <= sts-1) list.push(BOARD[num+2-SIZE]);
    }

    return list;
}

var remove = function(square) {
    if(!PATH || !square) {
        return;
    }
    for(var i=0; i<PATH.length; i++) {
        if(PATH[i] === square) {
            PATH.splice(i,1);
            return;
        }
    }
}

var moveKnight = function() {
    if(idx > NUM_SQUARES - 1) {
        tourInProgress = false;
        return;
    }
    var imgRef = document.getElementById(PATH[idx].getFormattedSquare());
    imgRef.style.width = "36px";
    imgRef.style.height = "33px";
    imgRef.src = "img/wN.png";
    idx++;
    setTimeout(moveKnight, 1000);
}

var reset = function() {
    if(tourInProgress) {
        return;
    }
    idx = 0;
    tourInProgress = false;
    resetVisited();
    PATH = [];
    clearBoard();
}

var resetVisited = function() {
    for(var i=0; i<NUM_SQUARES; i++) {
        BOARD[i].setIsVisited(false);
    }
}

var clearBoard = function() {
    var imgRef;
    for(var i=0; i<NUM_SQUARES; i++) {
        imgRef = document.getElementById(BOARD[i].getFormattedSquare());
        imgRef.style.width = "0px";
        imgRef.style.height = "0px"
        imgRef.src = "";
    }
}