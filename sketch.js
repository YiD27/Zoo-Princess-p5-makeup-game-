let scene1, start, scene2, scene3;
let clicked = 0;
let eyes = [];
let noses = [];
let mouths = [];
let scene4A = [];
let scene4B;
let dragItem = null; // Variable to store the item being dragged
let button1Visible = false;
let a = 1; // Variable to check the placement of eyes, noses, and mouths

function preload() {
  scene1 = loadImage('1.png');
  start = loadImage('hand.png');
  scene2 = loadImage('2.png');
  scene3 = loadImage('3.png');
  scene4B = loadImage('scene4B.png');
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  if (clicked === 0) {
    background(scene1);
    image(start, 0, 0);
  } else if (clicked === 1) {
    background(255);
    background(scene2);
    text('Click mouse again', 650, 550);
  } else if (clicked === 2) {
    background(255);
    background(scene3);
    drawImages(); // Call the function to draw eyes, noses, and mouths
    if (button1Visible) {
      // Draw the button
      fill(0);
      rect(350, 520, 100, 40);
      fill(255);
      textSize(12);
      textAlign(CENTER, CENTER);
      text("Princess Ready!", 400, 540);
    }
  } else if (clicked === 3) {
      drawResult();
    //draw retry button
    fill(0);
      rect(650, 580, 100, 20);
      fill(255);
      textSize(12);
      textAlign(CENTER, CENTER);
      text("Another Makeup⟳", 700, 590);
  } else if (clicked === 4) {
    background(255);
    background(scene3);
    drawImages();
  }
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= start.width && mouseY >= 0 && mouseY <= start.height && clicked === 0) {
    clicked = 1;
  } else if (clicked === 1 && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    clicked = 2;
    setFace();
  }
  // Check if the mouse is pressed on any eye
  for (let i = 0; i < eyes.length; i++) {
    let eye = eyes[i];
    let eyeX = eye.xPos;
    let eyeY = eye.yPos;
    if (mouseX >= eyeX && mouseX <= eyeX + eye.itemImage.width &&
      mouseY >= eyeY && mouseY <= eyeY + eye.itemImage.height) {
      dragItem = eye; // Set the eye as the dragItem
      dragItem.drag = true; // Start dragging
      break;
    }
  }
  //check if nose pressed
  for (let i = 0; i < noses.length; i++) {
    let nose = noses[i];
    let noseX = nose.xPos;
    let noseY = nose.yPos;
    if (mouseX >= noseX && mouseX <= noseX + nose.itemImage.width &&
      mouseY >= noseY && mouseY <= noseY + nose.itemImage.height) {
      dragItem = nose; // Set the nose as the dragItem
      dragItem.drag = true; // Start dragging
      break;
    }
  }
  //check if mouth pressed
  for (let i = 0; i < mouths.length; i++) {
    let mouth = mouths[i];
    let mouthX = mouth.xPos;
    let mouthY = mouth.yPos;
    if (mouseX >= mouthX && mouseX <= mouthX + mouth.itemImage.width &&
      mouseY >= mouthY && mouseY <= mouthY + mouth.itemImage.height) {
      dragItem = mouth; // Set the mouth as the dragItem
      dragItem.drag = true; // Start dragging
      break;
    }
  }if (mouseX >= 350 && mouseX <= 450 && mouseY >= 520 && mouseY <= 560 && clicked === 2 && button1Visible) {
    clicked = 3;
  }if (mouseX >= 650 && mouseX <= 750 && mouseY >= 580 && mouseY <= 600 && clicked === 3) {
    clicked = 4;
    button1Visible = false;
    background(255);
    background(scene3);
    resetFace(); 
  }
}

function mouseReleased() {
  if (dragItem != null) {
    dragItem.drag = false; // Stop dragging
    dragItem = null; // Reset dragItem
    // Check if at least one eye, one nose, and one mouth are placed within the specified coordinate area
    let eyePlaced = false;
    let nosePlaced = false;
    let mouthPlaced = false;

    for (let i = 0; i < eyes.length; i++) {
      let eye = eyes[i];
      if (eye.xPos >= 280 && eye.xPos <= 520 && eye.yPos >= 230 && eye.yPos <= 365) {
        eyePlaced = true;
        break;
      }
    }
    for (let i = 0; i < noses.length; i++) {
      let nose = noses[i];
      if (nose.xPos >= 320 && nose.xPos <= 450 && nose.yPos >= 300 && nose.yPos <= 430) {
        nosePlaced = true;
        break;
      }
    }
    for (let i = 0; i < mouths.length; i++) {
      let mouth = mouths[i];
      if (mouth.xPos >= 320 && mouth.xPos <= 500 && mouth.yPos >= 400 && mouth.yPos <= 500) {
        mouthPlaced = true;
        break;
      }
    }
    // Set buttonVisible based on whether at least one eye, one nose, and one mouth are placed within the specified coordinate area
    button1Visible = eyePlaced && nosePlaced && mouthPlaced;
  }
}

function drawImages() {
  for (let e = 0; e < eyes.length; e++) {
    eyes[e].move();
  }
  for (let n = 0; n < noses.length; n++) {
    noses[n].move();
  }
  for (let m = 0; m < mouths.length; m++) {
    mouths[m].move();
  }
}

function drawResult() {
  for (let a = 1; a <= 6; a++) {
    let eyePlaced = eyes[a].xPos >= 280 && eyes[a].xPos <= 520 && eyes[a].yPos >= 230 && eyes[a].yPos <= 365;
    let nosePlaced = noses[a].xPos >= 320 && noses[a].xPos <= 450 && noses[a].yPos >= 300 && noses[a].yPos <= 430;
    let mouthPlaced = mouths[a].xPos >= 320 && mouths[a].xPos <= 500 && mouths[a].yPos >= 400 && mouths[a].yPos <= 500;

    if (eyePlaced && nosePlaced && mouthPlaced) {
      scene4A[a].display();
      return; 
    }
  }
  background(255); 
  image(scene4B, 0, 0); 
}
class Eye {
  constructor(x, y, imageName) {
    this.drag = false;
    this.snap = false;
    this.xPos = x || 0; // Added default value for x
    this.yPos = y || 0; // Added default value for y
    //loads whatever image the passed value imageName dictates
    this.itemImage = loadImage(imageName);
  }
  move() {
    //drags item when mouse pressed
    if (this.drag == true) {
      this.xPos = mouseX - this.itemImage.width / 2;
      this.yPos = mouseY - this.itemImage.height / 2;
    }
    //displays passed image
    image(this.itemImage, this.xPos, this.yPos);
  }
}

class Nose {
  constructor(x, y, imageName) {
    this.drag = false;
    this.snap = false;
    this.xPos = x || 0; // Added default value for x
    this.yPos = y || 0; // Added default value for y
    //loads whatever image the passed value imageName dictates
    this.itemImage = loadImage(imageName);
  }
  move() {
    //drags item when mouse pressed
    if (this.drag == true) {
      this.xPos = mouseX - this.itemImage.width / 2;
      this.yPos = mouseY - this.itemImage.height / 2;
    }
    //displays passed image
    image(this.itemImage, this.xPos, this.yPos);
  }
}

class Mouth {
  constructor(x, y, imageName) {
    this.drag = false;
    this.snap = false;
    this.xPos = x || 0; // Added default value for x
    this.yPos = y || 0; // Added default value for y
    //loads whatever image the passed value imageName dictates
    this.itemImage = loadImage(imageName);
  }
  move() {
    //drags item when mouse pressed
    if (this.drag == true) {
      this.xPos = mouseX - this.itemImage.width / 2;
      this.yPos = mouseY - this.itemImage.height / 2;
    }
    //displays passed image
    image(this.itemImage, this.xPos, this.yPos);
  }
}

class SceneA {
  constructor(imageName) {
    this.itemImage = loadImage(imageName);
  }
  display() {
    background(255); // Clear the canvas
    image(this.itemImage, 0, 0); // Display the image at position (0, 0)
  }
}

function setFace() {
  for (let e = 1; e <= 6; e++) {
    eyes.push(new Eye());
  }
  eyes[1] = new Eye(100, 30, "eye1.png");
  eyes[2] = new Eye(520, 20, "eye2.png");
  eyes[3] = new Eye(560, 150, "eye3.png");
  eyes[4] = new Eye(30, 260, "eye4.png");
  eyes[5] = new Eye(550, 330, "eye5.png");
  eyes[6] = new Eye(280, 15, "eye6.png");

  for (let n = 1; n <= 6; n++) {
    noses.push(new Nose());
  }
  noses[1] = new Nose(200, 390, "nose1.png");
  noses[2] = new Nose(100, 470, "nose2.png");
  noses[3] = new Nose(180, 140, "nose3.png");
  noses[4] = new Nose(600, 250, "nose4.png");
  noses[5] = new Nose(80, 180, "nose5.png");
  noses[6] = new Nose(600, 420, "nose6.png");

  for (let m = 1; m <= 6; m++) {
    mouths.push(new Mouth());
  }
  mouths[1] = new Mouth(560, 90, "mouth1.png");
  mouths[2] = new Mouth(680, 450, "mouth2.png");
  mouths[3] = new Mouth(60, 380, "mouth3.png");
  mouths[4] = new Mouth(200, 510, "mouth4.png");
  mouths[5] = new Mouth(520, 525, "mouth5.png");
  mouths[6] = new Mouth(30, 100, "mouth6.png");

  for (let i = 1; i <= 6; i++) {
    scene4A[i] = new SceneA(`scene4A${i}.png`);
  }
}
function resetFace() {
  // Clear the arrays
  eyes = [];
  noses = [];
  mouths = [];

  clicked = 2;
  setFace();
}