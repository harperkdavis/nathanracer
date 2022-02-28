const LOCAL_STORAGE_KEY = 'nathanRacer';
const VERSION = '0.1.0';

const SCALE = 20;

let keys = {};

let game = {
  map: [],
  outerWall: [],
  innerWall: [],
  camera: {x: 0, y: 0},
};

function len(vector) {
  return dist(0, 0, vector.x, vector.y);
}

function norma(vector) {
  const leng = len(vector);
  if (leng != 0) {
    return {x: vector.x / leng, y: vector.y / leng};
  } else {
    return {x: 0, y: 0};
  }
}

function dot(vectorA, vectorB) {
  return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
}

function angle(vectorA, vectorB) {
  if (len(vectorA) == 0 || len(vectorB) == 0) {
    return 0;
  }
  return acos(dot(vectorA, vectorB) / (len(vectorA) * len(vectorB)));
}

function cross(vectorA, vectorB) {
  return len(vectorA) * len(vectorB) * sin(angle(vectorA, vectorB));
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let dir = 0;
  let point = {x: 0, y: 0};
  for (let i = 0; i < 20; i++) {
    game.map.push({x: point.x, y: point.y});

    dir += pow(random(-1, 1), 3);
    point.x = point.x + sin(dir);
    point.y = point.y + cos(dir);
  }

  game.outerWall.push({x: game.map[0].x - 1, y: game.map[0].y});
  game.innerWall.push({x: game.map[0].x + 1, y: game.map[0].y});

  for (let i = 1; i < game.map.length - 1; i++) {
    const prevPoint = game.map[i - 1];
    const point = game.map[i];
    const nextPoint = game.map[i + 1];

    const before = {x: prevPoint.x - point.x, y: prevPoint.y - point.y};
    const after = {x: nextPoint.x - point.x, y: nextPoint.y - point.y};

    let out = norma({x: (before.x + after.x) / 2, y: (before.y + after.y) / 2});
    
    game.outerWall.push({x: point.x - abs(out.x), y: point.y - abs(out.y)});
    game.innerWall.push({x: point.x + abs(out.x), y: point.y + abs(out.y)});

  }

  game.outerWall.push({x: game.map[0].x - 1, y: game.map[0].y});
  game.innerWall.push({x: game.map[0].x + 1, y: game.map[0].y});
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  keys[keyCode] = 0;
}

function keyReleased() {
  keys[keyCode] = -1;
}

function update() {

  Object.keys(keys).forEach(key => {
    if (keys[key] >= 0) {
      keys[key] += 1;
    }
  });

}

function draw() {
  update();
  background(200);

  push();
  translate(game.camera.x * SCALE + width / 2, game.camera.y * SCALE + height / 2);
  fill(255);
  stroke(0);
  
  for (let i = 1; i < game.map.length; i++) {
    const prevPoint = game.map[i - 1];
    const point = game.map[i];

    stroke(0, 0, 255);
    line(prevPoint.x * SCALE, prevPoint.y * SCALE, point.x * SCALE, point.y * SCALE);

    stroke(255, 0, 0);
    line(game.outerWall[i].x * SCALE, game.outerWall[i].y * SCALE, game.outerWall[i - 1].x * SCALE, game.outerWall[i - 1].y * SCALE);

    stroke(0, 255, 0);
    line(game.innerWall[i].x * SCALE, game.innerWall[i].y * SCALE, game.innerWall[i - 1].x * SCALE, game.innerWall[i - 1].y * SCALE);
  }
}