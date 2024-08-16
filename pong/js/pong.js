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

var playerScores = document.querySelectorAll('.score');

function main() 
{
    //erases the canvas
    ctx.clearRect(0, 0, c.width, c.height);

    //player movement
    const keysMap = [{ up: 'w', down: 's' }, { up: 'ArrowUp', down: 'ArrowDown' }];

    for (let i = 0; i < pad.length; i++) 
    {
        if (keys[keysMap[i].up]) 
        {
            pad[i].vy += -pad[i].force;
        }
        if (keys[keysMap[i].down]) 
        {
            pad[i].vy += pad[i].force;
        }

        //apply friction
        pad[i].vy *= fy;

        //move players
        pad[i].move();

        
        if (pad[i].y < 0 + pad[i].h / 2) 
        {
            pad[i].y = 0 + pad[i].h / 2;
        }
        if (pad[i].y > c.height - pad[i].h / 2) 
        {
            pad[i].y = c.height - pad[i].h / 2;
        }
    }

    //ball movement
    ball.move();

    if (ball.x < 0) 
    {
        player[1].score++;
        ball.x = c.width / 2;
        ball.y = c.height / 2;
        ball.vx = -ball.vx;
    }

    if (ball.x > c.width) 
    {
        player[0].score++;
        ball.x = c.width / 2;
        ball.y = c.height / 2;
        ball.vx = -ball.vx;
    }

    if (ball.y < 0) 
    {
        ball.y = 0;
        ball.vy = -ball.vy;
    }
    if (ball.y > c.height) 
    {
        ball.y = c.height;
        ball.vy = -ball.vy;
    }

    for (let i = 0; i < pad.length; i++) 
    {
        if (ball.collide(pad[i])) 
        {
            if (i === 0) 
            {
                ball.x = pad[i].x + pad[i].w / 2 + ball.w / 2;
            } 
            else 
            {
                ball.x = pad[i].x - pad[i].w / 2 - ball.w / 2;
            }

            ball.vx = -ball.vx;
        }

        
        pad[i].draw();
    }

    console.log(`${player[0].score} | ${player[1].score}`);
 
    for (let i = 0; i < playerScores.length; i++) 
    {
        playerScores[i].innerText = player[i].score;
    }

    //draw the ball
    ball.draw();
}
