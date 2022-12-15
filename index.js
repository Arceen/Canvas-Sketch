const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ context, width, height }) => {
  const num = 20;
  const degree = -30;
  const rects = [];
  for (let i = 0; i < num; i++) {
    rects.push({
      x: random.range(0, width),
      y: random.range(0, height),
      w: random.range(200, 600),
      h: random.range(40, 200),
    });
  }
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'black';
    rects.forEach(({ x, y, w, h }) => {
      context.save();
      context.strokeStyle = 'blue';
      context.translate(x, y);
      drawSkewedRect({ context: context, w: w, h: h, degree: degree });
      context.restore();
    });
  };
};

const drawSkewedRect = ({ context, w = 600, h = 200, degree = -45 }) => {
  const rx = w * Math.cos(math.degToRad(degree));
  const ry = w * Math.sin(math.degToRad(degree));

  context.save();
  context.translate(rx * -0.5, (ry + h) * -0.5);
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(rx, ry);
  context.lineTo(rx, ry + h);
  context.lineTo(0, h);

  context.closePath();
  context.stroke();
  context.restore();
};

canvasSketch(sketch, settings);
