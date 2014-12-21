/*
 * @author: Kishore Pudipeddi (kpudipeddi@gmail.com)
 */

var Square = function(n) {
    this.num = n;
    this.visited = false;
    this.possibleMoves = [];

	this.getNum = function() {
		return this.num;
	}
    
	this.isVisited = function() {
    	return this.visited;
    }
	
	this.setIsVisited = function(visit) {
		this.visited = visit;
	}

    this.toString = function() {
		return this.getFormattedSquare();
	}

    this.getPossibleMoves = function() {
        return this.possibleMoves;
    }

    this.setPossibleMoves = function(moves) {
        this.possibleMoves = moves;
    }

    this.getFormattedSquare = function() {
        var toRet = "";
        var rank = parseInt(this.num / SIZE);
        var file = parseInt(this.num % SIZE);
        switch(file) {
            case 0: toRet = "a" + (rank+1); break;
            case 1: toRet = "b" + (rank+1); break;
            case 2: toRet = "c" + (rank+1); break;
            case 3: toRet = "d" + (rank+1); break;
            case 4: toRet = "e" + (rank+1); break;
            case 5: toRet = "f" + (rank+1); break;
            case 6: toRet = "g" + (rank+1); break;
            case 7: toRet = "h" + (rank+1); break;
        }
        return toRet;
    }

    this.getFormattedPossibleMoves = function() {
        if(this.possibleMoves == null || this.possibleMoves.length == 0) {
            return "";
        }

        return this.possibleMoves;
    }
}
