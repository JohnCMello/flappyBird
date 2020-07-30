console.log("[John's Flappy Bird]");

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


// [background]
const background = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  canvasX: 0,
  canvasY: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      background.spriteX, background.spriteY,
      background.largura, background.altura,
      background.canvasX, background.canvasY,
      background.largura, background.altura,
    );

    contexto.drawImage(
      sprites,
      background.spriteX, background.spriteY,
      background.largura, background.altura,
      (background.canvasX + background.largura), background.canvasY,
      background.largura, background.altura,
    );
  },
};

// [Floor]
const floor = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  canvasX: 0,
  canvasy: canvas.height - 112,
  desenha() {
    contexto.drawImage(
      sprites,
      floor.spriteX, floor.spriteY,
      floor.largura, floor.altura,
      floor.canvasX, floor.canvasy,
      floor.largura, floor.altura,
    );

    contexto.drawImage(
      sprites,
      floor.spriteX, floor.spriteY,
      floor.largura, floor.altura,
      (floor.canvasX + floor.largura), floor.canvasy,
      floor.largura, floor.altura,
    );
  },
};

const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  canvasX: 10,
  canvasY: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      flappyBird.spriteX, flappyBird.spriteY, // Sprite X, Sprite Y
      flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
      flappyBird.canvasX, flappyBird.canvasY,
      flappyBird.largura, flappyBird.altura,
    );
  }
}

function loop() {
  planoDeFundo.desenha();
  chao.desenha();
  flappyBird.desenha();

  flappyBird.y = flappyBird.y + 1;

  requestAnimationFrame(loop);
}

loop();