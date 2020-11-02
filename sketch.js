let capture;
const resolution = 5;

const associations = {
    0: '@',
    15: '%',
    30: '#',
    45: '&',
    57: '(',
    70: '/',
    85: ',',
    100: '.',
}

function setup() {
  createCanvas(1200, 1000);
  
  capture = createCapture(VIDEO);
  capture.hide();
}
function draw() {
  background(255, 255, 255);
  if (capture.loadedmetadata) {
    let c = capture.get(0, 0, width, height);

    let d = pixelDensity();

    c.loadPixels();

    for(let i = 0; i < c.height; i += resolution) {
        for(let j = 0; j < c.width; j += resolution) {
          let index = 4 * d * (j * d * c.width + i);
          let col = color(c.pixels[index], c.pixels[index + 1], c.pixels[index + 2], c.pixels[index + 3]);

          let b = brightness(col);
          let character;

          if(b >= 100) {
            character = associations[100]
          } else if(b >= 85) {
            character = associations[85]
          } else if(b >= 70) {
            character = associations[70]
          } else if(b >= 57) {
            character = associations[57]
          } else if(b >= 45) {
            character = associations[45]
          } else if(b >= 30) {
            character = associations[30]
          } else if(b >= 15) {
            character = associations[15]
          } else {
            character = associations[0]
          }
          
          textSize(10)
          text(character, -i * 2 + width, j * 2)
        }
    }

    // c.updatePixels();
  }
}
