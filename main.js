/**
 * TODO:
 * 
 * - Pelotas choquen
 * - Pausa 
 * - Traza de colores (la traza se mantiene)
 * - Pelotas choquen con pared en el diametro no en el punto 0
 * 
 */
let ball_q = 15;
let ball_size = 10;
let gridSize = 30;
let cellSize = 20;
let dungeonData;
let circles = [];
let speedScale = 1; // Ajusta la velocidad global

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

function draw() {
  background(0);
  // Dibujar la mazmorra según el JSON
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (dungeonData.grid[y][x] === 1) {
        fill(0);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }

  // Mover y dibujar los círculos
  for (let circle of circles) {
    circle.move();
    circle.display();
  }
}

class Circle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speedX = random(-1, 1) * speedScale;
    this.speedY = random(-1, 1) * speedScale;
    // this.prevX = x;
    // this.prevY = y;
    
  }

  move() {

    this.x += this.speedX;
    this.y += this.speedY;

    let gridX = floor(this.x / cellSize);
    let gridY = floor(this.y / cellSize);
    if (gridX >= 0 && gridX < gridSize && gridY >= 0 && gridY < gridSize) {
      if (dungeonData.grid[gridY][gridX] === 1) {
        // Colisión detectada
        // Invertir la velocidad según la dirección de la colisión
        if (this.speedX > 0) {
          this.x = gridX * cellSize;
        } else {
          this.x = (gridX + 1) * cellSize;
        }
        if (this.speedY > 0) {
          this.y = gridY * cellSize;
        } else {
          this.y = (gridY + 1) * cellSize;
        }
        this.speedX *= -1;
        this.speedY *= -1;
      }
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, ball_size);

    // Dibujar la estela
    stroke(this.color);
    strokeWeight(2);
    line(this.x, this.y,this.prevX, this.prevY, ); 
  }
}