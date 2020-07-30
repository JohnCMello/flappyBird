console.log( "[John's Flappy Bird]");


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
const floor = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    canvasX: 0,
    canvasY: canvas.height - 112,
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
            if(colidesFloor(flappyBird,floor)) {
                colisionSound.play();
                setTimeout(()=>{

                changeScreen(screens.START);
                }, 300)
                return
            }
            flappyBird.speed = flappyBird.speed + flappyBird.gravity;
            flappyBird.canvasY = flappyBird.canvasY + flappyBird.speed;        
        },
        print(){
            contexto.drawImage(//(image(sprites), sx.spriteX, sy.spriteY, sWidth.width, sHeight.height, dx.vancasX, dy.canvasY, dWidth.width, dHeight.height);
                sprites,
                flappyBird.spriteX, flappyBird.spriteY, //inicio do recorte X>,Y^;
                flappyBird.width, flappyBird.height, //width, height recorte na sprite; 
                flappyBird.canvasX, flappyBird.canvasY, // onde vai ser printdo no canvas;
                flappyBird.width, flappyBird.height, //width, height, dentro do canvas;
            );
        },
    }
    return flappyBird;
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
        },
        print(){
        background.print();
        floor.print();
        global.flappyBird.print();
        startScreen.print();
        },
        click(){
            changeScreen(screens.GAME)
        },
        reload(){

        }
    }
};

screens.GAME = {
    print(){
        background.print();
        floor.print();
        global.flappyBird.print();
    },
    click(){
        global.flappyBird.fly();
    },
    reload(){
        global.flappyBird.reload();
    }
};
    
function loop(){
    activeScreen.print();
    activeScreen.reload();
    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if(activeScreen.click){
        activeScreen.click();
    }

});

changeScreen(screens.START)   
loop();