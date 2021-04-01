var dog,dogImg,dogImg1;
var database;
var food,foodAmount;
var bg

function preload(){
   dogImg = loadImage("Dog.png");
   dogImg1 = loadImage("happy dog.png");
   dogImg2 = loadImage("Sleepy dog.png");
   bg =  loadImage("BG.jpeg")

  }

function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.19;

  foodAmount=database.ref('Food');
  foodAmount.on("value",readStock);
  textSize(20); 
}

function draw() {
  background(bg);
 
  if(keyWentDown(UP_ARROW) ){
    writeStock(food);
    dog.addImage(dogImg1);
    dog.scale = 0.3;
  }
  
  if (food === 0){

    dog.addImage(dogImg2);

  }

  drawSprites();
  fill("yellow");
  stroke("black");
  textSize(20);
  text("MONSTER-FOOD remaining : "+food,100,125);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Mike MONSTER-FOOD!!!",75,70);
}

function readStock(data){
  food=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}