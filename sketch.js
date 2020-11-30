var PLAY = 2;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0, survivalTime = 0, chance = 5 ;
var ground, groundImage;
var sun, sunImage;
var ground2, ground2Image;
var ground3, ground3Image;
var invisibleGround;
var invisibleGround2;
var bananaGroup, obstacleGroup, monkeyGroup, groundGroup, ground2Group;
var scoreplate, scoreplateImage;
var gameOver, gameOverImage;
//var back, backImage;
var GameOver, GameOverImage;
var orange, orangeImage;
var hitSound;
var eatSound;
var jumpSound;
var orangeGroup;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  sunImage = loadImage("sun.png");
  groundImage = loadImage("ground.png");
  ground3Image = loadImage("ground.png");
  ground2Image = loadImage("frame.jpg");
  scoreplateImage = loadImage("SCORE PLATE.jpg");
  gameOverImage = loadImage("gameOver.png");
  //backImage = loadImage("back.png");
  GameOverImage = loadImage("restart.png"); 
   orangeImage = loadImage("orange2.png"); 
  hitSound = loadSound("hitsound.mp3");
  eatSound = loadSound("eatsound.mp3");
  jumpSound = loadSound("jumpsound.mp3");


}

 


function setup() {
  createCanvas (600,windowHeight);
 
  
  ground2 = createSprite(360,236);
  ground2.addImage ("ground",ground2Image);
  ground2.scale = 0.5; 
  //ground2Group.add(ground2);
  
  sun = createSprite(535,60);
  sun.addImage ("sun",sunImage);
  sun.scale = 1.5;

  invisibleGround2 = createSprite(300,150,600,10);
  invisibleGround2.visible = false;
  //back.scale = 10;
 
  gameOver = createSprite(300,200);
  gameOver.addImage ("gameOver",gameOverImage); 
  gameOver.scale = 0.4
  
  monkey = createSprite(65,400);
  monkey.addAnimation ("monkey",monkey_running);
  monkey.scale = 0.16;
  monkey.debug = false;
  monkey.setCollider ("circle");
 // monkeyGroup.add(monkey);
  

  
  
  GameOver = createSprite(300, 320);
  GameOver.addAnimation ("GameOver", GameOverImage);
  GameOver.scale = 0.5;
  
  bananaGroup = createGroup();
 orangeGroup = createGroup();
  obstacleGroup = createGroup();
  ground2Group = createGroup();
  groundGroup = createGroup();
  monkeyGroup = createGroup();
}


function draw(){
  

  
  console.log(monkey.y)
  if(gameState === PLAY){
  
  invisibleGround = createSprite(300,460,700,20);
  invisibleGround.visible = false; 
    

    
  //back.visible = false; 
  gameOver.visible = false; 
  GameOver.visible = false; 
  
  if(frameCount % 60===0){
  ground = createSprite(559,1365);
  ground.addImage ("ground",groundImage);
  ground.scale =10;
  ground.velocityX = -(6 + score+1);
  ground.x = ground.width/2;
  groundGroup.add(ground);
    }
  
  if(frameCount % 10===0){
      survivalTime=survivalTime+1;
  }

  if(frameCount % 90===0){
  obstacle = createSprite(600,420)
  obstacle.addAnimation("obstacle", obstacleImage);
  obstacle.scale = 0.16;
  obstacle.velocityX = -(6 + score+1);
  obstacle.lifeTime = -100;
  obstacle.debug = false;
  obstacle.setCollider("circle");
  obstacleGroup.add(obstacle);
  }                        

  if(frameCount % 100===0){
  banana = createSprite(600,300);
  banana.addImage ("banana",bananaImage);
  banana.scale = 0.2;
  banana.lifetime = -100;
  banana.velocityX = -(6 + score+1);
  banana.y = Math.round(random(150,300))
  bananaGroup.add(banana);
  banana.setCollider("circle");
  }
    
      if(frameCount % 120===0){
  orange = createSprite(600,300);
  orange.addImage ("orange",orangeImage);
  orange.scale = 0.35;
  orange.lifetime = -100;
  orange.velocityX = -(6 + score+1);
  orange.y = Math.round(random(150,300))
  orangeGroup.add(orange);
  orange.setCollider("circle");
  }
    

  
  monkey.velocityY=monkey.velocityY + 0.8 ;
  
      
  monkey.collide (invisibleGround);
  monkey.collide (invisibleGround2);
  monkey.debug = false;

   if (monkey.isTouching(bananaGroup)){
 bananaGroup.destroyEach(); 
 score = score + 1;
 eatSound.play();
   
  switch(score)
   {
  case 1: monkey.scale = 0.18;
  break;
  case 2: monkey.scale = 0.19;
  break;
  case 3: monkey.scale = 0.20;
  break;
  case 4: monkey.scale = 0.21;
  break;
  case 5: monkey.scale = 0.22;
  break;
  case 6: monkey.scale = 0.23;
  break;
  default: break;
}
 }
    
        if (monkey.isTouching(orangeGroup)){
      orangeGroup.destroyEach();
      score = score + 2;
      eatSound.play();
       
      switch(score)
   {
  case 5: monkey.scale = 0.18;
  break;
  case 10: monkey.scale = 0.19;
  break;
  case 15: monkey.scale = 0.20;
  break;
  case 20: monkey.scale = 0.21;
  break;
  case 25: monkey.scale = 0.22;
  break;
  case 30: monkey.scale = 0.23;
  break;
  default: break;
}
    }
    
    
  if(keyDown("space") || touches.length>0){
  monkey.velocityY = -17;
 jumpSound.play();
  touches = [];
  }
  

    

  
  if (monkey.isTouching(obstacleGroup)){
     obstacleGroup.destroyEach(); 
     chance = chance - 1;
     hitSound.play();
    monkey.scale = 0.16;
  }
  if (chance < 1){
  gameState = END;    
      }
    
 // back.visible = false; 
  gameOver.visible = false;
  
  scoreplate = createSprite(300,72);
  scoreplate.addImage("scoreplate", scoreplateImage);
  scoreplate.scale = 0.35
    

  }


  
  if (gameState === END){
  //back.visible = true; 
  gameOver.visible = true; 
  GameOver.visible = true; 


    
  monkey.visible = false;
  obstacleGroup.visible = false;
  banana.visible = false;
  orange.visible = false;
  ground.velocityX = 0;
   
    if (mousePressedOver(GameOver) || touches.length > 0 ){
reset();
   touches = [];   
  
  }
  }

  

  
  

  


  
  

  
  drawSprites();

  fill("RED")
  textSize (20);
  text("SCORE : " + score, 250, 40);
  
  textSize (20);
  text("SURVIVAL TIME : " + survivalTime, 210, 80);
  
  fill("RED")
  textSize (20);
  text("CHANCE : " + chance, 240, 120);
  
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  GameOver.visible = false;
  monkey.visible = true;
  bananaGroup.visible = true;
  orangeGroup.visible = true;
  
  score = 0;
  chance = 5;
  survivalTime = 0;
  
  monkey.y = 400;
  
}

















