//creating sprites
var among,among1;
var background1,background2;
var ground,ground1;
var score;
var coinGroup,coin;
var groundGroup;
var gameState=0;
var PLAY=0;
var END=1;

function preload(){
  //load images
  
among = loadAnimation("1.png","2-1.png","3.png","4-1.png");
among2=loadAnimation("0.png");
  
background1 = loadImage("Untitled.png");
  
ground = loadImage("10-1.png");
  
sea = loadImage("2.png");
  
ground4 = loadImage("4.png");
  
coin1 = loadImage("Indian-2.5-Gold-Dollars-Dollars-64-Reverse.png");

  
}
function setup() {
  //create canavas
  
  createCanvas(600, 300);
    
  background2=createSprite(500,300,1000,600);
  background2.addImage(background1);
   
  sea1=createSprite(300,300,100,20);
  sea1.addImage(sea);
  sea1.width=600;
  sea1.height=50;
  sea1.scale=0.5;

  ground3=createSprite(130,270,50,50);
  ground3.addImage(ground4);
  
  among1=createSprite(60,100,20,20);
  among1.addAnimation("running",among);
  among1.scale=0.1;
  
  coinGroup=new Group();
  groundGroup=new Group();
  coinGroup1=new Group();
  
  score=0;
}

 function draw() {
  //background colour
   
  if(gameState===PLAY){
  spawnGround();
  
  console.log(score);
   
  ground3.scale=0.1;
  ground3.velocityX=-1.5;
  ground3.lifetime=100; 
    
  if(among1.isTouching(coinGroup)){
    coinGroup.destroyEach();
    score=score+1;
  }
    
  spawnCoins();
   
  spawnCoins1();
   
  drawSprites();
  
  if(touches.length>0&&among1.y>=110||keyDown("space")&&among1.y>=110){
  among1.velocityY=-30;
  touches=[];
    }   
  among1.velocityY=among1.velocityY+3;
         
  if(among1.isTouching(coinGroup1)){
    coinGroup1.destroyEach();
    score=score+1;
  }
  
  if(among1.x>50){
    among1.x=50
  }
  if(among1.x<50){
    among1.x=50;
  }
    
  stroke("black");
  textSize(20);
  text("Score: - "+score,500,20);
    
  console.log(gameState);
    
  ground3.setCollider("rectangle",-2700,190,ground3.width,500);
  ground3.debug=true;
   
  among1.setCollider("rectangle",0,0,among.width,among1.height);
  among1.debug=true;
   
  among1.collide(groundGroup);
  among1.collide(ground3);
   
  }
  if(among1.y>300){
   gameState=END;
 }

  if(gameState===END){
  among1.velocityY=0;
  groundGroup.VelocityX=0;
  coinGroup.velocityX=0;
  coinGroup1.velocityX=0;
  stroke("black")
  textSize(20);
  text("Game End",270,150);
  text("Press 'space' or tap on the screen to restart",120,180);
  if(touches.length>0||keyDown("space")){
  gameState=PLAY;
  among1.y=100;
  among1.x=30;
  groundGroup.destroyEach();
  coinGroup.destroyEach();
  coinGroup1.destroyEach();
  ground3.x=130;
  ground3.y=270;
  ground3.velocityX=-1.5;
  score=0;
  touches=[];
  }
  }
}
function spawnGround(){
if(frameCount%70===0){
  ground1=createSprite(700,200,500,550);
  ground1.addImage(ground);
  ground1.scale=0.2;
  ground1.y=Math.round(random(179,300));
  ground1.velocityX=-4;
  ground1.lifetime=300;
  console.log(ground1.y);
  groundGroup.add(ground1);
  ground1.setCollider("rectangle",-0,80,1000,ground.height);
  ground1.debug=true;
}
}
function spawnCoins(){
  if(frameCount%140===0){
  coin=createSprite(700,30,20,20);
  coin.addImage(coin1);
  coin.scale=0.01;
  coin.velocityX=-4;
  coin.y=ground1.y-50;
  coin.x=ground1.x-50;
  coinGroup.add(coin);
  }
}
function spawnCoins1(){
  if(frameCount%140===0){
  coin=createSprite(700,30,20,20);
  coin.addImage(coin1);
  coin.scale=0.01;
  coin.velocityX=-4;
  coin.y=ground1.y-50;
  coin.x=ground1.x+50;
  coinGroup1.add(coin);
  }
}