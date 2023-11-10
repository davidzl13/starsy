let video;

function setup() {
  createCanvas(640, 480);
  video = createVideo("stars.mp4");
  video.hide(); // Hide the video element
  video.loop(); // Loop the video
}

function draw() {
  background(0);
  image(video, 0, 0, width, height);

}

function mousePressed() {
  if (video.elt.paused) {
    video.play();
  } else {
    video.pause();
  }




  // Loop through the pixels array and manipulate them
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      // Example: Draw a red rectangle if the pixel color is beyond a certain threshold
      if (r > 200) {
        fill(255, 0, 0);
        rect(x, y, 10, 10);
      }
    }
  }

  // Update the pixels on the canvas
  video.updatePixels();
}


