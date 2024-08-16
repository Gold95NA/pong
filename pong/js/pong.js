//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

//global friction variable
var fy = .97

//p1 setup
var player = [];

// Add new Player() objects to the 0 and 1 indexes
player[0] = new Player('Player 1', 0, 0, new Box());
player[1] = new Player('Player 2', 0, 0, new Box());

// Set up the paddles for each player
player[0].pad.w = 20;
player[0].pad.h = 150;
player[0].pad.x = 0 + player[0].pad.w / 2;

player[1].pad.w = 20;
player[1].pad.h = 150;
player[1].pad.x = c.width - player[1].pad.w / 2;
player[1].pad.color = 'green';  
player[1].pad.force = 1;

function main()
{
    //erases the canvas
    ctx.clearRect(0, 0, c.width, c.height);

    // Player 1 movement
    if (keys[`w`]) {
        player[0].pad.vy += -player[0].pad.force;
    }
    if (keys[`s`]) {
        player[0].pad.vy += player[0].pad.force;
    }

    // Player 2 movement
    if (keys[`ArrowUp`]) {
        player[1].pad.vy += -player[1].pad.force;
    }
    if (keys[`ArrowDown`]) {
        player[1].pad.vy += player[1].pad.force;
    }

    // Apply friction
    player[0].pad.vy *= fy;
    player[1].pad.vy *= fy;

    // Move players
    player[0].pad.move();
    player[1].pad.move();

    // Ball movement
    ball.move();

    // Player 1 collision
    if (player[0].pad.y < 0 + player[0].pad.h / 2) {
        player[0].pad.y = 0 + player[0].pad.h / 2;
    }
    if (player[0].pad.y > c.height - player[0].pad.h / 2) {
        player[0].pad.y = c.height - player[0].pad.h / 2;
    }

    // Player 2 collision
    if (player[1].pad.y < 0 + player[1].pad.h / 2) {
        player[1].pad.y = 0 + player[1].pad.h / 2;
    }
    if (player[1].pad.y > c.height - player[1].pad.h / 2) {
        player[1].pad.y = c.height - player[1].pad.h / 2;
    }

    // Ball collision 
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

    // Player 1 with ball collision
    if (ball.collide(player[0].pad)) {
        ball.x = player[0].pad.x + player[0].pad.w / 2 + ball.w / 2;
        ball.vx = -ball.vx;
    }

    // Player 2 with ball collision
    if (ball.collide(player[1].pad)) {
        ball.x = player[1].pad.x - player[1].pad.w / 2 - ball.w / 2;
        ball.vx = -ball.vx;
    }

    // Draw the objects
    player[0].pad.draw();
    player[1].pad.draw();
    ball.draw();
}
