//
// Constants
//

const WIDTH = 101, HEIGHT = 101
// const PALETTE = ['#000', '#fff', '#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f', '#000']
const PALETTE = ['#fff', '#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080', '#606060', '#404040', '#202020', '#000'].reverse()

const ITERATIONS = 100
const RUNNING = true

let NEXTFRAME

//
// Setup
//

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let grid = []
let tempgrid = []

function init() {
    canvas.width = WIDTH
    canvas.height = HEIGHT

    // Init the grid with 0's
    grid = new Array(HEIGHT).fill(0).map(x => new Array(WIDTH).fill(0))
    // Put a lot of sand grains in the middle
    grid[Math.floor(WIDTH/2)][Math.floor(HEIGHT/2)] = Infinity

    tempgrid = new Array(HEIGHT).fill(0).map(x => new Array(WIDTH).fill(0))

    draw()
}

//
// Update
//

function update() {
    // Copy the grid on the tempgrid
    for (let y=0; y<HEIGHT; y++) {
        for (let x=0; x<WIDTH; x++) {
            tempgrid[y][x] = grid[y][x]
        }
    }

    let n

    // Topple the grid
    for (let y=1; y<HEIGHT-1; y++) {
        for (let x=1; x<WIDTH-1; x++) {
            n = tempgrid[y][x]
            if (n > 7) {
                grid[y][x] -= 8
                grid[y-1][x] += 1
                grid[y+1][x] += 1
                grid[y][x-1] += 1
                grid[y][x+1] += 1
                grid[y-1][x+1] += 1
                grid[y+1][x-1] += 1
                grid[y-1][x-1] += 1
                grid[y+1][x+1] += 1
            }
        }
    }
}

//
// Dräw, bröther
//

function draw() {
    let n

    for (let y=1; y<HEIGHT-1; y++) {
        for (let x=1; x<WIDTH-1; x++) {
            n = grid[y][x]
            ctx.fillStyle = PALETTE[n > 8 ? 8 : n]
            ctx.fillRect(x, y, 1, 1)
        }
    }

    NEXTFRAME = requestAnimationFrame(nextframe)
}

//
// Animation
//

function nextframe() {
    update()
    draw()
}

//
// Start
//

init()
nextframe()

// for (let i=0; i<ITERATIONS; i++) {
//     update()
// }

// draw()
