

/***
 * TODO:
 * 
 * Mejorar Index para que ball_q sea obtenido desde el parametro de la URL
 * 
 * 
 */
let ball_q = 15;
let ball_size = 10;
let gridSize = 30;
let cellSize = 20;
let dungeonData;
let circles = [];
let speedScale = 1; // Ajusta la velocidad global
let isPaused = false;

function preload() {
  // Cargar el JSON con la estructura de la mazmorra
  dungeonData = loadJSON('dungeon.json');
}

function setup() {
  createCanvas(gridSize * cellSize, gridSize * cellSize);
  // Crear algunos círculos
  for (let i = 0; i < ball_q; i++) {
    circles.push(new Circle(random(width), random(height), color(random(255), random(255), random(255))));
  }
}

function keyPressed() {
  if (keyCode === 32) {
    isPaused = !isPaused;
  }
}

function draw() {
  if (!isPaused) {
    background(0);
    // Dibujar la mazmorra según el JSON
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (dungeonData.grid[y][x] === 1) {
          stroke("white");
          fill(0);
          rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }

    // Mover y dibujar los círculos
    for (let i = 0; i < circles.length; i++) {
      circles[i].move();
      circles[i].display();
      for (let j = i + 1; j < circles.length; j++) {
        circles[i].collide(circles[j]);
      }
    }
  }
}

class Circle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speedX = random(-1, 1) * speedScale;
    this.speedY = random(-1, 1) * speedScale;
    this.history = [];

  }

  move() {
    if (!isPaused) {
      this.x += this.speedX;
      this.y += this.speedY;

      let gridX = floor(this.x / cellSize);
      let gridY = floor(this.y / cellSize);
      if (gridX >= 0 && gridX < gridSize && gridY >= 0 && gridY < gridSize) {
        if (dungeonData.grid[gridY][gridX] === 1) {
          // Colisión detectada

          /***
           * 
           * TODO:
           * 
           * Añadir contador de colisiones 
           * 
           * 
           */

          // Invertir la velocidad según la dirección de la colisión
          this.x = (this.speedX > 0) ? (gridX * cellSize) : ((gridX + 1) * cellSize);
          this.y = (this.speedY > 0) ? (gridY * cellSize) : ((gridY + 1) * cellSize);
          this.speedX *= -1;
          this.speedY *= -1;
          this.speedX += random(-0.5, 0.5);
          this.speedY += random(-0.5, 0.5);
        }
      }
      var v = createVector(this.x, this.y);
      this.history.push(v);
      this.displayTrail(); // Comentar esta linea para que no se vean las estelas 
    }
  }

  collide(other) {
    let dx = this.x - other.x;
    let dy = this.y - other.y;
    let distance = sqrt(dx * dx + dy * dy);

    if (distance < ball_size * 2) {
      // Colisión detectada
      let angle = Math.atan2(dy, dx);
      let sin = Math.sin(angle);
      let cos = Math.cos(angle);

      // Rotar las velocidades de los círculos
      let tempX = this.speedX * cos + this.speedY * sin;
      let tempY = -this.speedX * sin + this.speedY * cos;
      this.speedX = other.speedX * cos + other.speedY * sin;
      this.speedY = -other.speedX * sin + other.speedY * cos;
      other.speedX = tempX;
      other.speedY = tempY;
    }
  }


  displayTrail() {
    for (var i = 0; i < this.history.length; i++) {
      var pos = this.history[i];
      fill(this.color);
      ellipse(pos.x, pos.y, ball_size - (ball_size / 2));
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, ball_size);
  }
}