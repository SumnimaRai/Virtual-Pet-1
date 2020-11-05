//Create variables here
var dogImg, happyDog, database, foodS, foodStock,dog;
function preload()
{
  //load images here
 dogImg = loadImage("images/dogImg.png");
 happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();

   dog = createSprite(250,350,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.10;  

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {
background(46, 139, 87);

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  textSize(15);
  fill(30,30,30);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

function readStock(data){
  foodS=data.val();
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