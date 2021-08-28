var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var invisibleLine;
var END = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  invisibleLine = createSprite(580,20,10,10);
  invisibleLine.visible = false;
  invisibleLine.velocityY = 1;

  doorsGroup = new Group();
climbersGroup = new Group();
invisibleBlockGroup = new Group();

ghost = createSprite(400,200,50,50);
ghost.addImage(ghostImg);
ghost.scale = 0.3;
}

function draw() {
  background(200);
  
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("RIGHT_ARROW")) {
ghost.x = ghost.x+3;
    }
    if(keyDown("LEFT_ARROW")){
      ghost.x = ghost.x-3;
          }
          if (keyDown("space")){
            ghost.velocityY = -5
            
//ghost.play(spookySound);
          }
          ghost.velocityY =ghost.velocityY+0.5;
          if (climbersGroup.isTouching(ghost)){
ghost.velocityY=0;
          }
          if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
            ghost.destroy();
          }
          if (invisibleLine.isTouching(ghost)){
            gameState = END;
          }
          else if(gameState === END){
            tower.velocityY = 0;
            doorsGroup.setVelocityYEach(0);
            climbersGroup.setVelocityYEach(0);
          console.log("GameOver");
          }

    spawnDoors();
    drawSprites();
}
function spawnDoors(){
  if (frameCount%240===0){
    door = createSprite(Math.round(random(120,400)),-50);
    door.addImage(doorImg);
door.velocityY = 1;
doorsGroup.add(door);
ghost.depth = door.depth;
ghost.depth = ghost.depth + 1;
climber = createSprite(200,10);
climber.addImage(climberImg);
climber.x = door.x;
climber.velocityY = 1;
climbersGroup.add(climber);
 invisibleBlock = createSprite(200,15);
 invisibleBlock.width = climber.width;
 invisibleBlock.height = 2;
 invisibleBlock.x = door.x
 invisibleBlock.visible = false;
 invisibleBlock.velocityY = 1;
 invisibleBlockGroup.add(invisibleBlock);
 
  }

}