//
// Constants
//

const WIDTH = 101, HEIGHT = 101
// const PALETTE = ['#f7f1e3', '#706fd3', '#474787', '#40407a', '#2c2c54']
// const PALETTE = ['#f7f1e3', '#33d9b2', '#34ace0', '#706fd3', '#ff5252']
// const PALETTE = ['#f7f1e3', '#34e7e4', '#4bcffa', '#575fcf', '#0be881']
// const PALETTE = ['#f7f1e3', '#f6e58d', '#ffbe76', '#ff7979', '#eb4d4b']
// const PALETTE = ['#95afc0', '#7ed6df', '#e056fd', '#686de0', '#30336b']
// const PALETTE = ['#dfe6e9', '#55efc4', '#81ecec', '#74b9ff', '#a29bfe']
// const PALETTE = ['#f7f1e3', '#686de0', '#f0932b', '#ffbe76', '#e056fd']
// const PALETTE = ['#f7f1e3', '#ffda79', '#ffb142', '#ff793f', '#ff5252']
// const PALETTE = ['#fff', '#ccc', '#999', '#666', '#333']
const PALETTE = ['#000', '#fff', '#f00', '#0f0', '#00f']

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
            if (n > 3) {
                grid[y][x] -= 4
                grid[y-1][x] += 1
                grid[y+1][x] += 1
                grid[y][x-1] += 1
                grid[y][x+1] += 1
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
            ctx.fillStyle = PALETTE[n > 4 ? 4 : n]
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

// // Display the diameter of the figure
// let longest = grid[Math.floor(HEIGHT/2)]
// for (let i=0; i<longest.length; i++) {
//     if (longest[i] !== 0) {
//         console.log(WIDTH - 2*i) + 1
//         break
//     }
// }

// draw()
