// initialisation du jeu

const sides = {
    UP: 'up',
    DOWN: 'down'
}

// une grille de 6x6
const BOARD_SIZE = 6
    //let board = Board(BOARD_SIZE);



class Board {
    constructor(size) {
        this.size = size
        this.grid = new Array(size)
        for (let i = 0; i < size; i++) {
            this.grid[i] = new Array(size);
            //FIXME initialiser à null
        }
    }

    isValidPosition(position) {
        // rester dans le cadre
        if (position.x < 0 || position.x >= this.size - 1) return false;
        if (position.y < 0 || position.y >= this.size - 1) return false;
        return true;
    }

    getPositionContent(position) {
        if (!this.isValidPosition(position)) throw 'No content out of the board!'
        return this.grid[position.x, position.y];
    }

    setPositionContent(position, value) {
        this.grid[position.x, position.y] = value;
    }

    isValidDestination(side, position) {
        if (!this.isValidPosition(position)) return false;
        // éviter les cases de sorties adverses
        if (side == sides.UP && position.y == 0 && (position.x == 0 || position.x == this.size - 1)) return false;
        if (side == sides.DOWN && position.y == this.size - 1 && (position.x == 0 || position.x == this.size - 1)) return false;
        // éviter les cases occupées par ses propres fantomes.
        // FIXME: probablement un problème de undef null pour le cases vides ici
        if (this.getPositionContent(position).side == side) return false;
        return true;
    }

    movePhantom(initialPosition, finalPosition) {
        let unit = getPostionContent(initialPosition);
        if (unit == null) throw "Can't move from an empty position";
        if (!this.isValidDestination(unit.side, finalPosition)) throw "Can't move to that position";
        this.setPositionContent(initialPosition, null);
        this.setPositionContent(finalPosition, unit);
    }
}

class Renderer {
    // s'occupe de tout ce qui est représenté à l'écran.
    static initBoard(boardSize) {
        // crée le tableau dans la div id="board"
        let tbl = document.getElementById("board");

        // creating all cells
        for (var i = 0; i < boardSize; i++) {
            // creates a table row
            var row = document.createElement("tr");

            for (var j = 0; j < boardSize; j++) {
                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                var cell = document.createElement("td");
                var id = i + "_" + j;
                cell.setAttribute("id", id);
                var cellText = document.createTextNode(id);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            tbl.appendChild(row);
        }

        // addstyle for exit cells
        document.getElementById("0_0").classList.add("exit");
        document.getElementById("0_" + (boardSize - 1)).classList.add("exit");
        document.getElementById((boardSize - 1) + "_0").classList.add("exit");
        document.getElementById((boardSize - 1) + "_" + (boardSize - 1)).classList.add("exit");

    }
}

class Player {
    constructor(side) {
        this.side = side;
        this.spareUnits = new Array((BOARD_SIZE - 2) * 2);
        this.units = [];
        for (let i = 0; i <= 4; i++) {
            this.units.push(new Phantom())
        }
    }
}

class Phantom {
    constructor(side, position, color) {
        this.side = side
        this.position = position;
        this.color = color;
    }

}

class GameMaster {
    // s'occupe des règles du jeu et de donner son tour à chaque joueur.
    static play() {
        Renderer.initBoard(6);
    }
}