console.log( "[John's Flappy Bird]");

let frames = 0;
const colisionSound = new Audio()
colisionSound.src = './assets/sounds/hit.wav'
const sprites = new Image();
sprites.src = './assets/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//[Background]
const background = {
    spriteX: 390,
    spriteY: 0,
    width: 275,
    height: 204,
    canvasX: 0,
    canvasY: canvas.height - 204,
    print(){
        contexto.fillStyle = '#70c6ce';
        contexto.fillRect(0,0,canvas.width,canvas.height); //ctx.fillRect(x, y, width, height);
        
        contexto.drawImage(//(image(sprites), sx.spriteX, sy.spriteY, sWidth.width, sHeight.height, dx.vancasX, dy.canvasY, dWidth.width, dHeight.height);
            sprites,
            background.spriteX, background.spriteY, //inicio do recorte X>,Y^;
            background.width, background.height, //width, height recorte na sprite;
            background.canvasX, background.canvasY, // onde vai ser printdo no canvas;
            background.width, background.height, //width, height, dentro do canvas;
        );
        contexto.drawImage(
            sprites,
            background.spriteX, background.spriteY, //inicio do recorte X>,Y^;
            background.width, background.height, //width, height recorte na sprite; 
            (background.canvasX + background.width) , background.canvasY, // onde vai ser printdo no canvas;
            background.width, background.height, //width, height, dentro do canvas;
        );
    }
}
//[Floor]
function moveFloor(){
    const floor = {
        spriteX: 0,
        spriteY: 610,
        width: 224,
        height: 112,
        canvasX: 0,
        canvasY: canvas.height - 112,
        reload(){
            const floorMovement = 1;
            const repeatFloor = floor.width / 2;
            const movement = floor.canvasX - floorMovement;

            floor.canvasX = movement % repeatFloor;
           

        },
        print(){
            contexto.drawImage(//(image(sprites), sx.spriteX, sy.spriteY, sWidth.width, sHeight.height, dx.vancasX, dy.canvasY, dWidth.width, dHeight.height);
                sprites,
                floor.spriteX, floor.spriteY, //inicio do recorte X>,Y^;
                floor.width, floor.height, //width, height recorte na sprite; 
                floor.canvasX, floor.canvasY, // onde vai ser printdo no canvas;
                floor.width, floor.height, //width, height, dentro do canvas;
            );
            contexto.drawImage(//(image(sprites), sx.spriteX, sy.spriteY, sWidth.width, sHeight.height, dx.vancasX, dy.canvasY, dWidth.width, dHeight.height);
                sprites,
                floor.spriteX, floor.spriteY, //inicio do recorte X>,Y^;
                floor.width, floor.height, //width, height recorte na sprite; 
                (floor.canvasX + floor.width), floor.canvasY, // onde vai ser printdo no canvas;
                floor.width, floor.height, //width, height, dentro do canvas;
            );
        }
    }
    return floor;
};

//[Colision]
function colidesFloor(flappyBird, floor){
    const flappybirdY = flappyBird.canvasY + flappyBird.height;
    const floorLimit = floor.canvasY;
    
    if(flappybirdY >= floorLimit){
        return true;
    }
    return false;
}
//[Player] - BIRD
function newBird(){
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        width: 33,
        height: 24,
        canvasX: 10,
        canvasY: 50,
        flap: 4.5,
        fly(){
            flappyBird.speed = - flappyBird.flap;
        },
        gravity: 0.25,
        speed: 0,
        reload(){
            if(colidesFloor(flappyBird,global.floor)) {
                colisionSound.play();
                setTimeout(()=>{

                changeScreen(screens.START);
                }, 300)
                return
            }
            flappyBird.speed = flappyBird.speed + flappyBird.gravity;
            flappyBird.canvasY = flappyBird.canvasY + flappyBird.speed;        
        },
        movements: [
            { spriteX: 0, spriteY: 0 },//asa cima
            { spriteX: 0, spriteY: 26 },//asa meio
            { spriteX: 0, spriteY: 52 },//asa baixo
        ],
        currentFrame: 0,
        reloadFrame(){
            const framesInterval = 8;
            const overInterval = frames % framesInterval === 0;

            if(overInterval){
                const frameBase = 1;
                const increase = frameBase + flappyBird.currentFrame;
                const repetition = flappyBird.movements.length;
                flappyBird.currentFrame = increase % repetition;
            }
            //console.log('incremento', increase);
            //console.log('base repetição', repetition);
            //console.log('frame', increase % repetition );
        } ,
        print(){
            flappyBird.reloadFrame();
            const { spriteX, spriteY } = flappyBird.movements[flappyBird.currentFrame];

            contexto.drawImage(//(image(sprites), sx.spriteX, sy.spriteY, sWidth.width, sHeight.height, dx.vancasX, dy.canvasY, dWidth.width, dHeight.height);
                sprites,
                spriteX, spriteY, //inicio do recorte X>,Y^;
                flappyBird.width, flappyBird.height, //width, height recorte na sprite; 
                flappyBird.canvasX, flappyBird.canvasY, // onde vai ser printdo no canvas;
                flappyBird.width, flappyBird.height, //width, height, dentro do canvas;
            );
        },
    }
    return flappyBird;
}
//[Pipes]
function createPipes(){
    const pipes = {
        width: 52,
        height: 400,
        top:{
        spriteX: 52,
        spriteY: 169,    
        },
        bottom:{
        spriteX: 0,
        spriteY: 169,
        },
        spacement: 80,
        print(){

            pipes.pairs.forEach(function(pair){
                const randomYPipes = pair.y
                const spacingBetweenPipes = 90; //spacing between pipes
            
                //pipe top
                const pipeTopX = pair.x;
                const pipeTopY = randomYPipes;

                contexto.drawImage(//(image(sprites), sx.spriteX, sy.spriteY, sWidth.width, sHeight.height, dx.vancasX, dy.canvasY, dWidth.width, dHeight.height);
                    sprites,
                    pipes.top.spriteX, pipes.top.spriteY, //inicio do recorte X>,Y^;
                    pipes.width, pipes.height, //width, height recorte na sprite; 
                    pipeTopX, pipeTopY, // onde vai ser printdo no canvas;
                    pipes.width, pipes.height, //width, height, dentro do canvas;
                );
                //pipe bottom
                const pipeBottomX = pair.x;
                const pipeBottomY = pipes.height + spacingBetweenPipes + randomYPipes;

                contexto.drawImage(//(image(sprites), sx.spriteX, sy.spriteY, sWidth.width, sHeight.height, dx.vancasX, dy.canvasY, dWidth.width, dHeight.height);
                    sprites,
                    pipes.bottom.spriteX, pipes.bottom.spriteY, //inicio do recorte X>,Y^;
                    pipes.width, pipes.height, //width, height recorte na sprite; 
                    pipeBottomX, pipeBottomY, // onde vai ser printdo no canvas;
                    pipes.width, pipes.height, //width, height, dentro do canvas;
                );
                pair.pipeTop = {
                    x: pipeTopX,
                    y: pipes.height + pipeTopY,
                }
                pair.pipeBottom = {
                    x: pipeBottomX,
                    y: pipeBottomY,
                }   
            })
        },
        colidesWithPipes(pair){
            const birdHead = global.flappyBird.canvasY;
            const birdFeet = global.flappyBird.canvasY + global.flappyBird.height;

            if(global.flappyBird.canvasX >= pair.x){
                if(birdHead <= pair.pipeBottom.y){
                  return true;
                }
                if(birdFeet >= pair.pipeBottom.y){
                    return true;
                }
            }
            return false;
        },
        pairs: [],
        reload(){
            const over100frames = frames % 100 ===0;
            if(over100frames){
                console.log('passou 100 frames');
                pipes.pairs.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                });
            }
            pipes.pairs.forEach(function(pair){
                pair.x = pair.x - 2;

                if(pipes.colidesWithPipes(pair)){
                    console.log('bateu cano');
                    changeScreen(screens.START)
                }
                if(pair.x + pipes.width <= 0){
                    pipes.pairs.shift();
                }
            });
        }
    }
    return pipes;
}

//[StartScreen]
const startScreen = {
    spriteX: 134,
    spriteY: 0,
    width: 174,
    height: 152,
    canvasX: ( canvas.width / 2 ) - 174 / 2,
    canvasY: 50,
    print(){
        contexto.drawImage(//(image(sprites), sx.spriteX, sy.spriteY, sWidth.width, sHeight.height, dx.vancasX, dy.canvasY, dWidth.width, dHeight.height);
            sprites,
            startScreen.spriteX, startScreen.spriteY, //inicio do recorte X>,Y^;
            startScreen.width, startScreen.height, //width, height recorte na sprite; 
            startScreen.canvasX, startScreen.canvasY, // onde vai ser printdo no canvas;
            startScreen.width, startScreen.height, //width, height, dentro do canvas;
        );   
    }
}
//[Screens]
const global = {};
let activeScreen = {};

function changeScreen(newScreen){
    activeScreen = newScreen;
    
    if(activeScreen.restart){
        activeScreen.restart();
    }
}

const screens = {
    START:{
        restart(){
        global.flappyBird = newBird();
        global.floor = moveFloor();
        global.pipes = createPipes();
        },
        print(){
        background.print();
        global.pipes.print();
        global.floor.print();
        global.flappyBird.print();
        startScreen.print();
        },
        click(){
            changeScreen(screens.GAME)
        },
        reload(){
            global.floor.reload();
        }
    }
};

screens.GAME = {
    print(){
        background.print();
        global.pipes.print();
        global.floor.print();
        global.flappyBird.print();
    },
    click(){
        global.flappyBird.fly();
    },
    reload(){
        global.pipes.reload();
        global.floor.reload();
        global.flappyBird.reload();
    }
};
    
function loop(){
    activeScreen.print();
    activeScreen.reload();

    frames = frames + 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if(activeScreen.click){
        activeScreen.click();
    }

});

changeScreen(screens.START)   
loop();