console.log( "[John's Flappy Bird]");

const sprites = new Image();
sprites.src = './assets/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//[Background]
const background = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    canvasX: 0,
    canvasY: canvas.height - 204,
    desenha(){
        contexto.fillStyle = '#70c6ce';
        contexto.fillRect(0,0,canvas.width,canvas.height); //ctx.fillRect(x, y, width, height);
        
        contexto.drawImage(//(image(sprites), sx.spriteX, sy.spriteY, sWidth.largura, sHeight.altura, dx.vancasX, dy.canvasY, dWidth.largura, dHeight.altura);
            sprites,
            background.spriteX, background.spriteY, //inicio do recorte X>,Y^;
            background.largura, background.altura, //largura, altura recorte na sprite;
            background.canvasX, background.canvasY, // onde vai ser desenhado no canvas;
            background.largura, background.altura, //largura, altura, dentro do canvas;
        );
        contexto.drawImage(
            sprites,
            background.spriteX, background.spriteY, //inicio do recorte X>,Y^;
            background.largura, background.altura, //largura, altura recorte na sprite; 
            (background.canvasX + background.largura) , background.canvasY, // onde vai ser desenhado no canvas;
            background.largura, background.altura, //largura, altura, dentro do canvas;
        );
    }
}
//[Player]
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    canvasX: 10,
    canvasY: 50,
    desenha(){
        contexto.drawImage(//(image(sprites), sx.spriteX, sy.spriteY, sWidth.largura, sHeight.altura, dx.vancasX, dy.canvasY, dWidth.largura, dHeight.altura);
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, //inicio do recorte X>,Y^;
            flappyBird.largura, flappyBird.altura, //largura, altura recorte na sprite; 
            flappyBird.canvasX, flappyBird.canvasY, // onde vai ser desenhado no canvas;
            flappyBird.largura, flappyBird.altura, //largura, altura, dentro do canvas;
        );
    }
}
//[Floor]
const floor = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    canvasX: 0,
    canvasY: canvas.height - 112,
    desenha(){
        contexto.drawImage(//(image(sprites), sx.spriteX, sy.spriteY, sWidth.largura, sHeight.altura, dx.vancasX, dy.canvasY, dWidth.largura, dHeight.altura);
            sprites,
            floor.spriteX, floor.spriteY, //inicio do recorte X>,Y^;
            floor.largura, floor.altura, //largura, altura recorte na sprite; 
            floor.canvasX, floor.canvasY, // onde vai ser desenhado no canvas;
            floor.largura, floor.altura, //largura, altura, dentro do canvas;
        );
        contexto.drawImage(
            sprites,
            floor.spriteX, floor.spriteY, //inicio do recorte X>,Y^;
            floor.largura, floor.altura, //largura, altura recorte na sprite; 
            (floor.canvasX + floor.largura), floor.canvasY, // onde vai ser desenhado no canvas;
            floor.largura, floor.altura, //largura, altura, dentro do canvas;
        );
    }

}


function loop(){
    background.desenha();
    flappyBird.desenha();
    floor.desenha();
    requestAnimationFrame(loop);
}

loop();