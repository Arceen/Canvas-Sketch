const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'black';
    let x = 0.5 * width;
    let y = 0.5 * height;
    let w = 0.6 * width;
    let h = 0.1 * height;

    // let radius = 200;
    // context.translate(-0.5 * w, -0.5 * h);

    // context.strokeRect(x - 0.5 * w, y - 0.5 * h, w, h);

    // context.beginPath();
    // context.moveTo(0, 0);
    // context.lineTo(w, 0);
    // context.lineTo(w, h);
    // context.lineTo(0, h);
    // context.closePath();
    // context.stroke();
    context.save();
    context.strokeStyle = 'blue';
    context.translate(x, y);
    drawSkewedRect({ context: context, w: w, h: h, degree: 30 });
    context.restore();
    let angle = 30;
  };
};

const drawSkewedRect = ({ context, w = 600, h = 200, degree = -45 }) => {
  let rx = w * Math.cos(math.degToRad(degree));
  let ry = w * Math.sin(math.degToRad(degree));

  context.translate(rx * -0.5, (ry + h) * -0.5);
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(rx, ry);
  context.lineTo(rx, ry + h);
  context.lineTo(0, h);

  context.closePath();
  context.stroke();
};

canvasSketch(sketch, settings);
