let stars = [];
let comets = []
let backgroundImage;
let starImage;
let cursorImage;
let cometImage;
let cometSound;
let starCount = 0; 
let gameOver = false;
let level = 1; // Current level
let cometSpeed = 2; // Initial speed of comets


function preload() {
  backgroundImage = loadImage('pexels-instawalli-176851.jpg'); 
  starImage = loadImage('star-png-forgetmenot-golden-stars-26.png'); 
  cursorImage = loadImage('star-png-forgetmenot-golden-stars-26.png');
  cometImage = loadImage('meteorite.png');
  cometSound = loadSound('391658__jeckkech__collision.wav');
}

function setup() {
  createCanvas(600, 400);
  generateStars(50); 
  starCount = stars.length; 
}

function draw() {
  background(backgroundImage);

   //level completion
  if (starCount <= 0) {
    nextLevel();
  }
  
  // Draw comets
  for (let i = 0; i < comets.length; i++) {
    comets[i].update();
    comets[i].display();

    // collision with stars
    for (let j = 0; j < stars.length; j++) {
      if (comets[i].hits(stars[j])) {
        stars.splice(j, 1); // Remove the star if hit by a comet
        j--; // Adjust the index as the array length has decreased
        cometSound.play(); // Play the comet hit sound
        starCount--; // Decrease the star count
      }
    }
  }

  // Draw stars
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].display();

    //if the cursor is over a star
    if (stars[i].isClicked(mouseX, mouseY)) {
      stars.splice(i, 1); // Remove the star if clicked by the cursor
      i--; // Adjust the index as the array length has decreased
      starCount--; // Decrease the star count
      cometSound.play(); // Play the comet hit sound
    }
  }

  //if the cursor is within the canvas
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    // Draw cursor image at the cursor position
    image(cursorImage, mouseX - 20, mouseY - 20, 50, 50); 
  }

  // Generate new comets randomly
  if (random() < 0.02) {
    comets.push(new Comet(width, random(height), -2, 1));
  }

  // star count display
  fill(250);
  textSize(18);
  text(`Stars: ${starCount}`, 10, 25);
}

function generateLevel() {
  generateStars(50 + level * 50); // Regenerate stars with 50 more for each level
  starCount = stars.length; // Reset star count
  cometSpeed = 2 + level * 0.5; // Increase comet speed for each level

  for (let i = 0; i < starCount; i++) {
    comets.push(new Comet(width, random(height), -cometSpeed, 1));
  }
}

function nextLevel() {
  // Increase level
  level++;

  // Clear existing comets for next level
  comets = [];

  // Generate next level
  generateLevel();
}

function generateStars(numStars) {
  for (let i = 0; i < numStars; i++) {
    let x = random(width);
    let y = random(height);
    let speed = random(0.005, 0.02);
    let delay = random(0, 2 * PI);
    stars.push(new Star(x, y, speed, delay));
  }
}


function displayGameOver() {
  
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Game Over', width / 2, height / 2);
}

class Comet {
  constructor(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.size = 20; 
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap around the canvas if the comet goes off-screen
    if (this.x < 0) {
      this.x = width;
      this.y = random(height);
    }
  }

  display() {
   image(cometImage, this.x, this.y, this.size, this.size); 
  }

  hits(star) {
    // collision with a star
    let d = dist(this.x, this.y, star.x, star.y);
    return d < this.size / 2 + star.size / 2;
  }
}

class Star {
  constructor(x, y, speed, delay) {
    this.x = x;
    this.y = y;
    this.initialY = y;
    this.speed = speed;
    this.angle = delay;
    this.amplitude = random(10, 30);
    this.delay = delay;
    this.size = 20; 
  }

  update() {
    this.y = this.initialY + 30 * sin(this.angle);
    this.angle += this.speed;
  }

  display() {
    image(starImage, this.x, this.y, this.size, this.size); 
  }

  isClicked(cx, cy) {
    // if the cursor clicked on the star
    let d = dist(cx, cy, this.x, this.y);
    return d < this.size / 2;
  }
}