let font;
let str = "WINDING ROAD";

function preload() {
    font = loadFont('DesireLowercase1.otf');
}

function setup() {
    createCanvas(800, 800);
}

function draw() {
    blendMode(BLEND);
    background(20);
    blendMode(ADD);

    const ctx = drawingContext;
    textAlign(CENTER, CENTER);
    textFont(font);
  textSize((height / 15) * 1.5);
  for (let y = 0; y <= height; y += (height / 15) * 0.9) {
    let distance = dist(
        0,
        y,
        0,
      (sin(frameCount / 33) * height) / 4 + (height * 3) / 4
    );
    let dist_blur = int(map(distance, 0, (height * 3) / 4, 0, 10));
    fill(255);
    ctx.filter = "blur(" + dist_blur + "px)";
    ctx.letterSpacing =
      map(sin((y / height) * TWO_PI + frameCount / 33), -1, 1, 0, 40) + "px";
    ctx.fillText(
        str,
      width / 2 + (sin((y / height) * TWO_PI + frameCount / 50) * height) / 2,
        y + 20
    );
    }
}
