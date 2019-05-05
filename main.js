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

function go1() {
  clear();
  goal = 1;
  run();
}

function go2() {
  clear();
  goal = 2;
  run();
}

/*
 * 2 - Living room
 * 1 - Bedroom
 * */
let goal;

draw();
renderSensors();

function run() {
  if (goal === 1 && wheel.x > 1.4 && wheel.y < 0.4) {
    return;
  }
  if (goal === 2 && wheel.x < 0.45 && wheel.y > 2.2) {
    return;
  }
  calcDistance();
  calcSimilarityMeasure();
  activateSensor(getMaxSensor());
  draw();
  setTimeout(() => run(), 3);
}

function getMaxSensor() {
  maxSensorId = 0;
  max = 0;
  sensors.forEach(sensor => {
    if (sensor.u > max) {
      max = sensor.u;
      maxSensorId = sensor.id;
    }
  });
  switch (maxSensorId) {
    case 2:
      if (sensors[0].u * 1.025 > sensors[1].u) maxSensorId--;
      break;
    case 3:
      if (sensors[1].u * 1.0275 > sensors[2].u) maxSensorId--;
      break;
    case 6:
      if (sensors[5].u < sensors[6].u * 1.01) maxSensorId++;
      break;
  }
  return maxSensorId;
}

function activateSensor(sensor) {
  switch (sensor) {
    case 1:
      wheel.y += 0.01;
      break;
    case 2:
      wheel.x += 0.005;
      wheel.y += 0.01;
      break;
    case 3:
      wheel.x += 0.01;
      break;
    case 4:
      if (goal === 1) {
        wheel.x += 0.005;
        wheel.y -= 0.01;
      } else {
        wheel.x += 0.005;
        wheel.y += 0.01;
      }
      break;
    case 5:
      wheel.y -= 0.01;
      break;
    case 6:
      wheel.y += 0.01;
      break;
    case 7:
      wheel.x -= 0.005;
      wheel.y += 0.01;
      break;
    case 8:
      wheel.x -= 0.01;
      break;
  }
}

function clear() {
  wheel = {
    x: 0.6,
    y: 0.4
  };
  roadC.innerHTML = "";
}

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
