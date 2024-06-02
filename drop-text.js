let engine;
let world;
let ground;
let polygons = [];
let str_n = 0;
let str = "example string test test";

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Matter.js 엔진과 월드 생성
  engine = Matter.Engine.create();
  world = engine.world;
  engine.world.gravity.scale = 0.002;

  // 지면 생성
  let groundOptions = {
    isStatic: true,
  };
  ground = Matter.Bodies.rectangle(width / 2, height - 10, width, 20, groundOptions);
  Matter.World.add(world, ground);
}

function draw() {
  background(20);

  // 매 15프레임마다 새로운 폴리곤 생성
  if (frameCount % 15 == 0) mousePressed(width / 2, 50);

  // Matter.js 엔진 업데이트
  Matter.Engine.update(engine);

  // 지면 그리기
  fill(170);
  noStroke();
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width, 20);

  // 폴리곤 그리기
  for (let i = polygons.length - 1; i >= 0; i--) {
    let polygon = polygons[i];

    push();
    translate(polygon.position.x, polygon.position.y);
    rotate(polygon.angle);
    textAlign(CENTER, CENTER);
    fill(255);
    noStroke();
    textFont("serif");
    textSize(polygon.radius * 2);
    text(polygon.string, 0, 0);
    pop();

    // 폴리곤이 화면 밖으로 나가면 제거
    if (polygon.position.y > height + 100) {
      Matter.World.remove(world, polygon);
      polygons.splice(i, 1);
    }
  }
}

function mousePressed(x = mouseX, y = mouseY) {
  let radius = random(20, 50);
  let options = {
    restitution: 0.1,
  };
  let polygon = Matter.Bodies.circle(x, y, radius, options);
  polygon.angle = random(TWO_PI);
  polygon.string = str.charAt(str_n++ % str.length);
  polygon.radius = radius;

  Matter.World.add(world, polygon);
  polygons.push(polygon);
}
