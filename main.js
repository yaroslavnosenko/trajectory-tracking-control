const wheelView = document.getElementById("wheel");
const roadC = document.getElementById("road-c");
const sensorsC = document.getElementById("sensor-c");

let sensors = [
  { x: 0.2, y: 0.7, d: 0, u: 0, id: 1 },
  { x: 0.2, y: 1.2, d: 0, u: 0, id: 2 },
  { x: 1, y: 1.8, d: 0, u: 0, id: 3 },
  { x: 2, y: 1.5, d: 0, u: 0, id: 4 },
  { x: 2, y: 0.7, d: 0, u: 0, id: 5 },
  { x: 2, y: 2.1, d: 0, u: 0, id: 6 },
  { x: 1.7, y: 2.8, d: 0, u: 0, id: 7 },
  { x: 1.3, y: 2.8, d: 0, u: 0, id: 8 }
];

let wheel = {
  x: 0.6,
  y: 0.4
};

/*
 * 0 - start
 * 1 - Living room
 * 2 - Bedroom
 * */
let goal = 1;

draw();
renderSensors();
main();

function main() {
  calcDistance();
  calcSimilarityMeasure();
  if (sensors[0].u * 1.025 > sensors[1].u) {
    wheel.y += 0.01;
  } else if (sensors[1].u * 1.05 > sensors[2].u) {
    wheel.y += 0.01;
    wheel.x += 0.01;
  } else if (sensors[2].u > sensors[3].u) {
    wheel.x += 0.01;
  } else {
    // wheel.x += 0.01;ufh
  }
  draw();
  setTimeout(() => main(), 5);
}

function clear() {}

function calcDistance() {
  for (let i = 0; i < 8; i++) {
    sensors[i].d = Math.sqrt(
      Math.pow(wheel.x - sensors[i].x, 2) + Math.pow(wheel.y - sensors[i].y, 2)
    );
  }
}

function calcSimilarityMeasure() {
  for (let i = 0; i < 8; i++) {
    sensors[i].u = 1 - sensors[i].d / sumAllDistances();
  }
}

function sumAllDistances() {
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += sensors[i].d;
  }
  return sum;
}

function draw() {
  wheelView.style.bottom = wheel.y * 40 * 5 - 15 + "px";
  wheelView.style.left = wheel.x * 40 * 5 - 15 + "px";
  // ROAD
  let road = document.createElement("div");
  road.className = "road";
  road.style.bottom = wheel.y * 40 * 5 - 5 + "px";
  road.style.left = wheel.x * 40 * 5 - 5 + "px";
  roadC.appendChild(road);
}

function renderSensors() {
  sensors.forEach(sensor => {
    let sensorView = document.createElement("div");
    sensorView.className = "sensor";
    sensorView.style.bottom = sensor.y * 40 * 5 - 10 + "px";
    sensorView.style.left = sensor.x * 40 * 5 - 10 + "px";
    sensorsC.appendChild(sensorView);
  });
}
