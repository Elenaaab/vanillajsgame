var app = {
  init: function () {
    console.log('init');

    // TODO
    app.drawBoard();
    // app.moveForward();
    // app.turnRight();
    // app.turnLeft();

    // TODO Event listeners 
    // Je pointe l'élément sur lequel on met un écouteur
    let buttonLaunch = document.getElementById('launchScript');
    // Je lui ajoute un écouteur
    buttonLaunch.addEventListener('click', app.handleLaunchScriptButton);

  },
  handleLaunchScriptButton: function () {
    // TODO

    let playerScript = document.getElementById('userCode').value;

    // TODO : get all lines as an array

    let codeLines = playerScript.split('\n');

    window.setTimeout(function () {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },
  codeLineLoop: function (codeLines, index) {
    // Getting currentLine
    var currentLine = codeLines[index];
    console.log(currentLine);

    // On interprète les commandes du joueur: 

    if (currentLine == 'turn left') {
      app.turnLeft();
    } else if (currentLine == 'turn right') {
      app.turnRight();
    } else if (currentLine == 'move forward') {
      app.moveForward();
    } else {
      console.log('Oupsie je ne comprends pas ta demande');
    }

    // Increment
    index++;

    // if still a line to interpret
    if (index < codeLines.length) {
      // Recall same method (=> make a loop)
      window.setTimeout(function () {
        app.codeLineLoop(codeLines, index);
      }, 1000);
    } else {
      window.setTimeout(function () {
        app.checkSuccess();
      }, 1000);
    }
  },

  // TODO display if the game is won or not

  checkSuccess: function () {
    let endCell = document.querySelector('.cell');

    if (endCell.classList.contains('cellEnd') == true) {
      console.log("bravo c'est gagné!");
    } else {
      console.log("on dirait que t'as tout foiré !");
    }
  },

  // Je déclare la fonction drawboard qui dessine la board dans le DOM

  drawBoard: function () {

    // Je déclare des variables pour pouvoir pointer les cases
    var board, cellRow, simpleCell;

    // Je pointe l'élément parent qui a l'ID board
    board = document.getElementById('board');

    // ! On crée 4 éléments row à attacher au parent board :
    // Je crée une row (x4):
    for (x = 0; x < 4; x++) {
      cellRow = document.createElement('div');
      // Je lui ajoute une classe 
      cellRow.classList.add('cellRow');
      // Je déclare une variable pour l'id du row
      // Je lui ajoute un id
      cellRow.setAttribute("id", "row" + (x + 1));

      // ! On crée 6 éléments cell à attacher au parent row :
      // Je crée un élément cell (x6) :
      for (i = 0; i < 6; i++) {

        simpleCell = document.createElement('div');
        // Je lui ajoute une classe
        simpleCell.classList.add('cell');
        // Je l'attache à son élément parent row
        cellRow.appendChild(simpleCell);
      }

      // ! On attache l'élément row au parent :
      // J'attache le tout à l'élément parent à l'ID board 
      board.appendChild(cellRow);
      console.log(x);
    }

    //! Cases de départ et d'arrivée : 

    // 1 définir la première case en haut à gauche comme départ
    let startCell = board.querySelector('#row1 .cell:nth-child(1)');
    startCell.classList.add('cellStart', 'cellCurrent');

    // 2 définir la dernière case en bas à droite comme arrivée
    let endCell = board.querySelector('#row4 .cell:nth-child(6)');
    endCell.classList.add('cellEnd');
  },

  // Fonction pour avancer d'une case : 

  moveForward: function () {

    let startCell = board.querySelector('.cellCurrent');
    let playCell = startCell.nextSibling;
    startCell.classList.remove('cellCurrent');
    playCell.classList.add('cellCurrent');

  },

  // Tourner à droite : si on est vers la droite, c'est tourner vers le bas, si on est vers le bas, c'est tourner vers la gauche, ainsi de suite...

  turnRight: function () {
    let playCell = board.querySelector('.cellCurrent');

    // Si l'élément possède la classe BOTTOM on lui ajoute LEFT

    if (playCell.classList.contains('cellCurrent-bottom')) {
      playCell.classList.replace('cellCurrent-bottom', 'cellCurrent-left');

      // Si l'élément possède la classe RIGHT on lui ajoute la classe BOTTOM
    } else if (playCell.classList.contains('cellCurrent-right')) {
      playCell.classList.replace('cellCurrent-right', 'cellCurrent-bottom');

      // Si l'élément possède la classe TOP on lui ajoute RIGHT
    } else if (playCell.classList.contains('cellCurrent-top')) {
      playCell.classList.replace('cellCurrent-top', 'cellCurrent-right');

      // Si l'élément possède la classe LEFT on lui ajoute TOP
    } else if (playCell.classList.contains('cellCurrent-left')) {
      playCell.classList.replace('cellCurrent-left', 'cellCurrent-top');
    }
  },

  //Pareil pour tourner à gauche mais tout inversé...

  turnLeft: function () {

    let playCell = board.querySelector('.cellCurrent');

    // Si l'élément possède la classe BOTTOM on lui ajoute RIGHT

    if (playCell.classList.contains('cellCurrent-bottom')) {
      playCell.classList.replace('cellCurrent-bottom', 'cellCurrent-right');

      // Si l'élément possède la classe RIGHT on lui ajoute la classe TOP
    } else if (playCell.classList.contains('cellCurrent-right')) {
      playCell.classList.replace('cellCurrent-right', 'cellCurrent-top');

      // Si l'élément possède la classe TOP on lui ajoute LEFT
    } else if (playCell.classList.contains('cellCurrent-top')) {
      playCell.classList.replace('cellCurrent-top', 'cellCurrent-left');

      // Si l'élément possède la classe LEFT on lui ajoute BOTTOM
    } else if (playCell.classList.contains('cellCurrent-left')) {
      playCell.classList.replace('cellCurrent-left', 'cellCurrent-bottom');
    }
  }
}


document.addEventListener('DOMContentLoaded', app.init);