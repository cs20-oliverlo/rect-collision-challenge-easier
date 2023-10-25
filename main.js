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
    // // Player Left Detection
    // if (player[0].x < walls[n].xw && player[0].x > walls[n].x && player[0].y < walls[n].yh && player[0].yh > walls[n].y) {
    //     reset();
    // }
    // // Player Right Detection
    // if (player[0].xw > walls[n].x && player[0].xw < walls[n].xw && player[0].y < walls[n].yh && player[0].yh > walls[n].y) {
    //     reset();
    // }
    // // Player Top Detection
    // if (player[0].y < walls[n].y + walls[n].h && player[0].y + player[0].h > walls[n].y) {
    //     reset();
    // }
    // // Player Bottom Detection
    // if (player[0].y + player[0].h > walls[n].y) {
    //     reset();
    // }

    if (player[0].yh > walls[n].y && player[0].yh < walls[n].yh && player[0].x < walls[n].x + walls[n].w - player[0].xSpeedMax && player[0].x + player[0].w > walls[n].x + player[0].xSpeedMax) {
        reset();
      } else if (player[0].y < walls[n].yh && player[0].y > walls[n].y && player[0].x < walls[n].x + walls[n].w - player[0].xSpeedMax && player[0].x + player[0].w > walls[n].x + player[0].xSpeedMax) {
        reset();
      } else if (player[0].x < walls[n].x + walls[n].w && player[0].x > walls[n].x && player[0].y < walls[n].yh && player[0].yh > walls[n].y) {
        reset();
      } else if (player[0].x + player[0].w > walls[n].x && player[0].x + player[0].w < walls[n].x + walls[n].w &&player[0].y < walls[n].yh && player[0].yh > walls[n].y) {
        reset();
      }
}

function newPlayer() {
    player = [];
    player.push(
        {
            x: 100,
            y: 100,
            w: 20,
            h: 20,
            xh: 0,
            yh: 0,
            color: "blue",
            up: false,
            left: false,
            right: false,
            down: false
        } 
    );
    player[0].xw = player[0].x + player[0].w;
    player[0].yh = player[0].y + player[0].h;
}

function reset() {
    walls = [
        {
            x: 0,
            y: 0,
            w: cnv.width,
            h: 20,
            xh: 0,
            yh: 0,
            color: "grey",
        },
        {
            x: 0,
            y: 0,
            w: 20,
            h: cnv.height,
            xh: 0,
            yh: 0,
            color: "grey",
        },
        {
            x: cnv.width - 20,
            y: 0,
            w: 20,
            h: cnv.height,
            xh: 0,
            yh: 0,
            color: "grey",
        },
        {
            x: 0,
            y: cnv.height - 20,
            w: cnv.width,
            h: 20,
            xh: 0,
            yh: 0,
            color: "grey",
        },
        {
            x: 0,
            y: cnv.height - 20,
            w: cnv.width,
            h: 20,
            xh: 0,
            yh: 0,
            color: "grey",
        },
        {
            x: 200,
            y: 200,
            w: 10,
            h: 10,
            xh: 0,
            yh: 0,
            color: "grey",
        },
    ];

    for (let i = 0; i < walls.length; i++) {
        walls[i].xw = walls[i].x + walls[i].w;
        walls[i].yh = walls[i].y + walls[i].h;
    }


    newPlayer();
}