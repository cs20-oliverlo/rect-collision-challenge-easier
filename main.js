// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 500;

// EVENT STUFF
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
    if (event.code === "ArrowUp") {
        player[0].up = true;
    }
    if (event.code === "ArrowLeft") {
        player[0].left = true;
    }
    if (event.code === "ArrowRight") {
        player[0].right = true;
    }
    if (event.code === "ArrowDown") {
        player[0].down = true;
    }
}

function keyupHandler(event) {
    if (event.code === "ArrowUp") {
        player[0].up = false;
    }
    if (event.code === "ArrowLeft") {
        player[0].left = false;
    }
    if (event.code === "ArrowRight") {
        player[0].right = false;
    }
    if (event.code === "ArrowDown") {
        player[0].down = false;
    }
}

// Reset Variables
let player = [];
// (walls variable declared here so that I can put the whole variable at the bottom)
let walls = [];

reset();

// Animation
requestAnimationFrame(animate);
function animate() {
      ctx.clearRect(0, 0, cnv.width, cnv.height);

    for (let i = 0; i < walls.length; i++) {
        drawWalls(i);
        checkCollision(i);
    }

    drawPlayer();
    playerMovement();

    // Request Animation Frame
    requestAnimationFrame(animate);
}

function drawWalls(n) {
    ctx.fillStyle = `${walls[n].color}`;
    ctx.fillRect(walls[n].x, walls[n].y, walls[n].w, walls[n].h);
}

function drawPlayer() {
    ctx.fillStyle = `${player[0].color}`;
    ctx.fillRect(player[0].x, player[0].y, player[0].w, player[0].h);
}

function playerMovement() {
    if (player[0].up === true) {
        player[0].y -= 5;
    }
    if (player[0].left === true) {
        player[0].x -= 5;
    }
    if (player[0].right === true) {
        player[0].x += 5;
    }
    if (player[0].down === true) {
        player[0].y += 5;
    }
}

function checkCollision(n) {
    // Top Detection
    if (player[0].y < walls[n].y + walls[n].h && player[0].y > walls[n].y && player[0].x < walls[n].x + walls[n].w && player[0].x + player[0].w > walls[n].x) {
        reset();
    }
    // Left Detection
    if (player[0].x < walls[n]. x + walls[n].w) {
        reset();
    }
    // if () {
    //     reset();
    // }
    // if () {
    //     reset();
    // }
}

function newPlayer(x1, y1, w1, h1, color1, up1, left1, right1, down1) {
    return {
            x: x1,
            y: y1,
            w: w1,
            h: h1,
            color: color1,
            up: up1,
            left: left1,
            right: right1,
            down: down1
        } 
}

function newWall(x1, y1, w1, h1, color1) {
    return {
            x: x1,
            y: y1,
            w: w1,
            h: h1,
            color: color1,
        }
}

function reset() {
    walls = [];
    walls.push(newWall(0, 0, cnv.width, 20, "grey"));
    walls.push(newWall(0, 0, 20, cnv.height, "grey"));
    walls.push(newWall(cnv.width - 20, 0, 20, cnv.height, "grey"));
    walls.push(newWall(0, cnv.height - 20, cnv.width, 20, "grey"));
    walls.push(newWall(0, cnv.height - 20, cnv.width, 20, "grey"));
    walls.push(newWall(200, 200, 10, 10, "grey"));
    walls.push(newWall(300, 300, 30, 30, "grey"));

    player = [];
    player.push(newPlayer(100, 100, 20, 20, "blue", false, false, false, false,));
}