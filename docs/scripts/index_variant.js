'use strict';

//
// Constants
//

var WIDTH = 101,
    HEIGHT = 101;
// const PALETTE = ['#000', '#fff', '#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f', '#000']
var PALETTE = ['#fff', '#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080', '#606060', '#404040', '#202020', '#000'].reverse();

var ITERATIONS = 100;
var RUNNING = true;

var NEXTFRAME = void 0;

//
// Setup
//

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var grid = [];
var tempgrid = [];

function init() {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // Init the grid with 0's
    grid = new Array(HEIGHT).fill(0).map(function (x) {
        return new Array(WIDTH).fill(0);
    });
    // Put a lot of sand grains in the middle
    grid[Math.floor(WIDTH / 2)][Math.floor(HEIGHT / 2)] = Infinity;

    tempgrid = new Array(HEIGHT).fill(0).map(function (x) {
        return new Array(WIDTH).fill(0);
    });

    draw();
}

//
// Update
//

function update() {
    // Copy the grid on the tempgrid
    for (var y = 0; y < HEIGHT; y++) {
        for (var x = 0; x < WIDTH; x++) {
            tempgrid[y][x] = grid[y][x];
        }
    }

    var n = void 0;

    // Topple the grid
    for (var _y = 1; _y < HEIGHT - 1; _y++) {
        for (var _x = 1; _x < WIDTH - 1; _x++) {
            n = tempgrid[_y][_x];
            if (n > 7) {
                grid[_y][_x] -= 8;
                grid[_y - 1][_x] += 1;
                grid[_y + 1][_x] += 1;
                grid[_y][_x - 1] += 1;
                grid[_y][_x + 1] += 1;
                grid[_y - 1][_x + 1] += 1;
                grid[_y + 1][_x - 1] += 1;
                grid[_y - 1][_x - 1] += 1;
                grid[_y + 1][_x + 1] += 1;
            }
        }
    }
}

//
// Dräw, bröther
//

function draw() {
    var n = void 0;

    for (var y = 1; y < HEIGHT - 1; y++) {
        for (var x = 1; x < WIDTH - 1; x++) {
            n = grid[y][x];
            ctx.fillStyle = PALETTE[n > 8 ? 8 : n];
            ctx.fillRect(x, y, 1, 1);
        }
    }

    NEXTFRAME = requestAnimationFrame(nextframe);
}

//
// Animation
//

function nextframe() {
    update();
    draw();
}

//
// Start
//

init();
nextframe();

// for (let i=0; i<ITERATIONS; i++) {
//     update()
// }

// draw()