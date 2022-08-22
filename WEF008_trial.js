const unitLength = 5; //value smaller, more grids
const boxColor = 150;
const strokeColor = 50;
let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let currentBoard; // pre-set as undefined
let nextBoard;
let slider;
let checkbox;
let isPatternMode = false
let selectedPattern = ""



function setup() {
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth, windowHeight - 100);
    canvas.parent(document.querySelector('#canvas'));



    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
    }

    init();  // Set the initial values of the currentBoard and nextBoard



}


/**
* Initialize/reset the board state
*/
function init() {

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
            // 	}
        }
    }
}


//the functions are extracted from p5.js library
//these codes are for drawing 
function draw() {
    background(255); //the background color behind the grid sheet;
    generate();


    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1) {

                colorSlider();  //automatically move color after mouseIsReleased

            } else {
                fill(255);
            }
            noStroke();
            ellipse(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
}

function generate() {
    //Loop over every single box on the board

    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Count all living members in the Moore neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        // the cell itself is not its own neighbor
                        continue;
                    }
                    // The modulo operator is crucial for wrapping on the edge
                    //
                    neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }

            // Rules of Life
            if (currentBoard[x][y] == 1 && neighbors < 2) {
                // Die of Loneliness
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 1 && neighbors > 3) {
                // Die of Overpopulation
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 0 && neighbors == 3) {
                // New life due to Reproduction
                nextBoard[x][y] = 1;
            } else {
                // Stasis
                nextBoard[x][y] = currentBoard[x][y];
            }
        }
    }

    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];


}

// const allSliders = document.querySelectorAll('input.type_slider');
// allSliders.forEach((slider) => {
//   slider.addEventListener('change', function() {
//     slider.setAttribute('value', slider.value);
//   });
// });


/**
 * When mouse is dragged
 */
function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }

    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);


    if (selectedPattern) {
        placePattern(x, y)
        return
    }

    currentBoard[x][y] = 1;
    background(255, 255, 255, 30)
    noStroke();
    colorSlider();
    ellipse(x * unitLength, y * unitLength, unitLength, unitLength);

}


/**
 * When mouse is pressed
 */
function mousePressed() {
    noLoop();
    mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
    loop();
    // speedSlider();
    var slider1 = document.getElementById("speed-slider");

    slider1.oninput = function () {
        console.log(this.value);
        frameRate(this.value);
    }
}

//reset button (completed)

let resetButton = document.querySelector(".reset-button")
resetButton.addEventListener('click', function () {
    alert("The game will restart!")
    init();
})

//pause button (completed)
let pauseButton = document.querySelector(".pause-button")
pauseButton.addEventListener('click', function () {
    noLoop();
})

//play button (completed)
let playButton = document.querySelector(".play-button");
playButton.addEventListener('click', function () {
    Loop();
})


//hint
// function hintPoint() {
//     var x = document.getElementById("myDiv");
//     if (x.innerHTML === "") {
//         x.innerHTML = url("");
//     } else {
//         x.innerHTML = "";
//     }
// }
function hintPoint() {
    var target = document.getElementById("target");
    var current = target.src;
    var url = prompt("change address from " + current + " to:", current);
    target.src = url;
}

//RGB color slider (completed, connected to element~)
function colorSlider() {
    var redSlider = document.querySelector("#red").value;
    var greenSlider = document.querySelector("#green").value;
    var blueSlider = document.querySelector("#blue").value;
    fill(redSlider, greenSlider, blueSlider)
}

//RGB color slider 2 (completed, connected to element~)
// function colorSlider2() {
//     var redSlider = document.querySelector("#red2").value;
//     var greenSlider = document.querySelector("#green2").value;
//     var blueSlider = document.querySelector("#blue2").value;
//     background(redSlider, greenSlider, blueSlider)
// }
// colorSlider2()

var speed = document.querySelector("#speed-slider")
speed.addEventListener("click", function (event) {
    fr = parseInt(event.currentTarget.value)
    console.log(fr)
    frameRate(fr)
})

// var lifespan = document.querySelector("#life-slider")
// lifespan.addEventListener("click", function (event) {
//     life = parseInt(event.currentTarget.value)
//     console.log(life)
//     return life
// })




