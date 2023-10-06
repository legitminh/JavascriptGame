let playerState = "idle"; //player animation state
let gameSpeed = 0; //px/s
const canvas = document.getElementById('canvas1');

const dropdown = document.getElementById('stateSelection');
dropdown.addEventListener('change', function(e){
  playerState = e.target.value;
})

const slider = document.getElementById("slider");
const showGameSpeed = document.getElementById("showGameSpeed");
showGameSpeed.innerHTML = gameSpeed = slider.value;

slider.addEventListener('change', function (e) {
  gameSpeed = e.target.value;
  showGameSpeed.innerHTML = gameSpeed;
})

const ctx = canvas.getContext('2d')
console.log(ctx);
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

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


var framewidthDict = {}
var masterCounter = 0;
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
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed;
  }
  update(){
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width){ //if out of screen, move infront of x2
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width){ //if out of screen, move infront of x
      this.x2 = this.width + this.x - this.speed;
    }
    //move left [x, x2]
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed)
    
  }
  draw(){
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);  
  }
  updateAndDraw(){
    this.update();
    this.draw();
  }
};
const layers = [
  new Layer(backgroundLayer1,0.2),
  new Layer(backgroundLayer2,0.4),
  new Layer(backgroundLayer3,0.6),
  new Layer(backgroundLayer4,0.8),
  new Layer(backgroundLayer5,1),
];

function animate() { //global render loop
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let animationLength = spriteAnimations[playerState].loc.length;
  let x = sw * (Math.floor(masterCounter / 5) % animationLength);
  let y = spriteAnimations[playerState].loc[(Math.floor(masterCounter / 5) % animationLength)].y;
  //ctx.drawImage(playerImage, sw * (Math.floor(masterCounter / 5) % 7), sy, sw, sh, 0, 0, sw, sh);
  //image, sx, sy, sourcewidth, sourceheight, dx,dy,dw,dh
  
  
  masterCounter++;
  layers.forEach(object => {
    object.updateAndDraw();
  });
  ctx.drawImage(playerImage, x, y, sw, sh, 0, 0, sw, sh);
  requestAnimationFrame(animate);
}
animate();