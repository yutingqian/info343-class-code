/* script file for the Canvas demo */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var canvas = document.getElementById('game-canvas');
    //2D rendering context
    var ctx = canvas.getContext('2d');

    //current game state
    var gameState;

    //create a new game state object
    function newGameState() {
        return {
          ball: {
              left: Math.random() * canvas.width,
              top: Math.random() * canvas.height,
              width: 5,
              height: 5,
              vectorX: 1,
              vectorY: 1,
              velocity: 3
          },
            paddle: {
                left: 20,
                top: 0,
                width: 10,
                height: canvas.height / 6
            },
            lastTimeStamp: performance.now()
        };
    } //newGameState()

    //render current game state to canvas element
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var ball = gameState.ball;
        //begin path
        ctx.beginPath();
        //draw arc
        ctx.arc(ball.left + (ball.width/2),
            ball.top + (ball.height/2),
            ball.width, 0, 2 * Math.PI);
        //fill in the circle
        ctx.fill();

        //render paddle
        var paddle = gameState.paddle;
        ctx.fillRect(paddle.left, paddle.top, paddle.width, paddle.height);

    } //render()

    //advance the animation by one step
    function step() {
        var ball = gameState.ball;

        //move the ball
        ball.left += ball.vectorX * ball.velocity;
        ball.top += ball.vectorY * ball.velocity;

        //bounce if hit right wall
        if (ball.left + ball.width >= canvas.width) {
            ball.vectorX = -ball.vectorX;
        }

        if (ball.top <= 0 || ball.top + ball.height >= canvas.height) {
            ball.vectorY = -ball.vectorY;
        }

        //bounce if hit paddle
        var paddle = gameState.paddle;
        if (ball.left <= paddle.left + paddle.width) {
            //if bottom of ball is at or below top of paddle
            if (ball.top + ball.height >= paddle.top
                && ball.top <= paddle.top + paddle.height) {
                ball.vectorX = -ball.vectorX;
            } else {
                //game over
                ctx.font = '20px Helvetica';
                var message = "Game Over";

                //width of text "Game Over"
                var metrics = ctx.measureText(message);
                ctx.fillText(message, (canvas.width - metrics.width)/2,
                    (canvas.height - 20)/2);
                return false;
            }
        }
        return true;
    } //step()

    //advance the animation and redraw
    function animate(timestamp) {
        var keepGoing = true;
        render();

        //advance animation if 16ms have pased
        if (timestamp - gameState.lastTimeStamp > 16) {
            keepGoing = step();
            gameState.lastTimeStamp = timestamp;
        }

        //if game is still going, keep animating
        if (keepGoing) {
            requestAnimationFrame(animate);
        }
    }

    document.addEventListener('mousemove', function(evt) {
        var canvasY = evt.clientY - canvas.offsetTop;
        var paddle = gameState.paddle;
        paddle.top = canvasY - (paddle.height/2);
    });

    //create new game state
    gameState = newGameState();

    //ask browser to animate as quickly as possible
    requestAnimationFrame(animate);

});
