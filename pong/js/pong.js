//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

//global friction variable
var fy = .97

//p1 setup
var player = [];

player[0] = new Player('Player 1', 0, 0, new Box());
player[1] = new Player('Player 2', 0, 0, new Box());

player[0].pad.w = 20;
player[0].pad.h = 150;
player[0].pad.x = 0 + player[0].pad.w / 2;

player[1].pad.w = 20;
player[1].pad.h = 150;
player[1].pad.x = c.width - player[1].pad.w / 2;
player[1].pad.color = 'green';  
player[1].pad.force = 1;  

//ball setup
var ball = new Box();
ball.w = 20
ball.h = 20
ball.vx = -2
ball.vy = -2
ball.color = `black`

var pad = [];

pad[0] = player[0].pad;
pad[1] = player[1].pad;

function main() {
    //erases the canvas
    ctx.clearRect(0, 0, c.width, c.height);

    //player movement
    if (keys[`w`]) {
        pad[0].vy += -pad[0].force;
    }
    if (keys[`s`]) {
        pad[0].vy += pad[0].force;
    }

    if (keys[`ArrowUp`]) {
        pad[1].vy += -pad[1].force;
    }
    if (keys[`ArrowDown`]) {
        pad[1].vy += pad[1].force;
    }

    //apply friction
    pad[0].vy *= fy;
    pad[1].vy *= fy;

    //move players
    pad[0].move();
    pad[1].move();

    //ball movement
    ball.move();

    //p1 collision
    if (pad[0].y < 0 + pad[0].h / 2) {
        pad[0].y = 0 + pad[0].h / 2;
    }
    if (pad[0].y > c.height - pad[0].h / 2) {
        pad[0].y = c.height - pad[0].h / 2;
    }

    if (pad[1].y < 0 + pad[1].h / 2) {
        pad[1].y = 0 + pad[1].h / 2;
    }
    if (pad[1].y > c.height - pad[1].h / 2) {
        pad[1].y = c.height - pad[1].h / 2;
    }

    //ball collision 
    if (ball.x < 0) {
        ball.x = c.width / 2;
        ball.y = c.height / 2;
    }
    if (ball.x > c.width) {
        ball.x = c.width / 2;
        ball.y = c.height / 2;
    }

    if (ball.y < 0) {
        ball.y = 0;
        ball.vy = -ball.vy;
    }
    if (ball.y > c.height) {
        ball.y = c.height;
        ball.vy = -ball.vy;
    }

    //p1 with ball collision
    if (ball.collide(pad[0])) {
        ball.x = pad[0].x + pad[0].w / 2 + ball.w / 2;
        ball.vx = -ball.vx;
    }

    //p2 
    if (ball.collide(pad[1])) {
        ball.x = pad[1].x - pad[1].w / 2 - ball.w / 2;
        ball.vx = -ball.vx;
    }

    //draw the objects
    pad[0].draw();
    pad[1].draw();
    ball.draw();
}
