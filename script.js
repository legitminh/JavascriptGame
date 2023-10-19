//used for first few parts of tutorial, deprecated.
let playerState = "idle"; //player animation state
let gameSpeed = 0; //px/s
let lastTime = 0;
let dt = 0;
const canvas = document.getElementById('canvas1');
let mouseBox = undefined;
const dropdown = document.getElementById('stateSelection');
dropdown.addEventListener('change', function(e){
  playerState = e.target.value;
})

const slider = document.getElementById("slider");
const showGameSpeed = document.getElementById("showGameSpeed");
showGameSpeed.innerHTML = gameSpeed = slider.value;

//GameSpeedSlider listener
slider.addEventListener('change', function (e) {
  gameSpeed = e.target.value;
  showGameSpeed.innerHTML = gameSpeed;
});

window.addEventListener('load', function(){ //only run when website is loaded, in case of large website
const ctx = canvas.getContext('2d')
console.log(ctx);
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
let canvasPosition = canvas.getBoundingClientRect();
window.addEventListener('click', function(e){
  mouseBox = [e.x - canvasPosition.left - 25, e.y - canvasPosition.top - 25, 50, 50];
  console.log(mouseBox);
  console.log(canvasPosition);

});
//BgImages
  const backgroundLayer1 = new Image();
  backgroundLayer1.src = 'backgroundLayers/layer-1.png';
  const backgroundLayer2 = new Image();
  backgroundLayer2.src = 'backgroundLayers/layer-2.png';
  const backgroundLayer3 = new Image();
  backgroundLayer3.src = 'backgroundLayers/layer-3.png';
  const backgroundLayer4 = new Image();
  backgroundLayer4.src = 'backgroundLayers/layer-4.png';
  const backgroundLayer5 = new Image();
  backgroundLayer5.src = 'backgroundLayers/layer-5.png';
  const playerImage = new Image();
  playerImage.src = 'shadow_dog.png';


var gameFrame = 0;
var sx = 0;
var sy = 0;
const sw = 575; //sprite width
const sh = 523;

const animationStates = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'getHit',
    frames: 4,
  },
];

var spriteAnimations = [];
animationStates.forEach((state, index) => { //set up player animations values in animationStates
  let frames = {
    loc: [],
  }
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * sw;
    let positionY = index * sh;
    frames.loc.push({ x: positionX, y: positionY })
  }
  spriteAnimations[state.name] = frames; //create entry of the state name
});

class Layer{
  constructor(image, speedModifier){
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed;
  }
  update(){
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width){
      this.x = 0;
    }
    this.x = Math.floor(this.x - this.speed);
    
  }
  draw(){
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);  
  }
  updateAndDraw(){this.update();this.draw();}
};
const layers = [
  new Layer(backgroundLayer1,0.2),
  new Layer(backgroundLayer2,0.4),
  new Layer(backgroundLayer3,0.6),
  new Layer(backgroundLayer4,0.8),
  new Layer(backgroundLayer5,1),
];

class Enemy{
  constructor(){
    this.image = new Image();
    this.image.src = 'enemies/enemy1.png';
    this.frameCount = 6;
    this.xs = 293;
    this.ys = 155;

    this.x = Math.random() * (CANVAS_WIDTH -  this.xs);
    this.y = Math.random() * (CANVAS_HEIGHT - this.ys);
    this.speed = -1;
    this.animationSpeed = Math.random()+0.5;

  }
  update(){
    if ((this.x + this.xs) < 0){
      this.x = CANVAS_WIDTH;
    }
    else{
      this.x += this.speed*gameSpeed;
    }
    this.y += Math.sin(gameFrame/20*this.animationSpeed)*2;
  }
  draw(){
    ctx.drawImage(this.image, (Math.floor(gameFrame*gameSpeed*this.animationSpeed)%this.frameCount) * this.xs, 0, this.xs, this.ys, this.x, this.y, this.xs, this.ys, 
      ); 
  }
  updateAndDraw(){this.update();this.draw();} 
}
let enemiesArray = [];
for (let i = 0; i<10; i++){
  enemiesArray.push(new Enemy());
}

function animate(timestamp) { //global render loop
  dt = timestamp - lastTime;//ms per frame 
  lastTime = timestamp;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let animationLength = spriteAnimations[playerState].loc.length;
  let x = sw * (Math.floor(gameFrame * gameSpeed) % animationLength);
  let y = spriteAnimations[playerState].loc[(Math.floor(gameFrame * gameSpeed) % animationLength)].y;
  //ctx.drawImage(playerImage, sw * (Math.floor(gameFrame / 5) % 7), sy, sw, sh, 0, 0, sw, sh);
  //image, sx, sy, sourcewidth, sourceheight, dx,dy,dw,dh
  
  
  gameFrame++;
  layers.forEach(object => {object.updateAndDraw();});
  enemiesArray.forEach(object => {object.updateAndDraw()})
  ctx.drawImage(playerImage, x, y, sw, sh, 0, 0, sw, sh);
  if (mouseBox !== undefined){
    ctx.fillStyle = 'white';
    ctx.fillRect(mouseBox[0],mouseBox[1],mouseBox[2],mouseBox[3]);
  }
  requestAnimationFrame(animate);
  
}
animate(0);
});

