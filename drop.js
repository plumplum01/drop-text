let engine;
let world;
let ground;
let polygons = [];
let str_n = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  engine = Matter.Engine.create();
  world = engine.world;
  engine.world.gravity.scale = 0.002;

  let groundOptions = {
    isStatic: true,
  };
  ground = Matter.Bodies.rectangle(
    width / 2,
    height - 10,
    width,
    20,
    groundOptions
  );
  Matter.World.add(world, ground);
}

function draw() {
  background(20);

  if (frameCount % 15 == 0) mousePressed(width / 2, 50);

  Matter.Engine.update(engine);

  fill(170);
  noStroke();
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width, 20);

  for (let i = polygons.length - 1; i >= 0; i--) {
    let polygon = polygons[i];

    push();
    translate(polygon.position.x, polygon.position.y);
    rotate(polygon.angle);
    // circle(0, 0, polygon.radius * 2);
    textAlign(CENTER, CENTER);
    fill(255);
    noStroke();
    textFont("serif");
    textSize(polygon.radius * 2);
    text(polygon.string, 0, 0);
    pop();

    if (polygon.position.y > height + 100) {
      Matter.World.remove(world, polygon);
      polygons.splice(i, 1);
    }
  }
}

function mousePressed(x = mouseX, y = mouseY) {
  let sides = int(random(3, 8));
  let radius = random(20, 50);
  let angle = (random(TWO_PI) / 180) * (random() > 0.5 ? -1 : 1);
  let options = {
    restitution: 0.1,
  };
  let polygon = Matter.Bodies.circle(x, y, radius, options);
  polygon.angle = angle;
  polygon.string = str.substr(str_n++ % str.length, 1);
  polygon.radius = radius;

  Matter.World.add(world, polygon);
  polygons.push(polygon);
}

let str ="Test tst nnn";