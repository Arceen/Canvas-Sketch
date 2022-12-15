const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const risoColors = require('riso-colors');

const settings = {
  dimensions: [1080, 1080],
  // animate: true,
};

const sketch = ({ context, width, height }) => {
  const num = 20;
  const degree = -30;
  const rectColors = [
    random.pick(risoColors),
    random.pick(risoColors),
    random.pick(risoColors),
  ];
  const rects = [];
  console.log(risoColors[10]);
  for (let i = 0; i < num; i++) {
    rects.push({
      x: random.range(0, width),
      y: random.range(0, height),
      w: random.range(200, 600),
      h: random.range(40, 200),
      // stroke: 'black',
      // fill: `rgba(${random.range(0,256)}, ${random.range(0,256)} , ${random.range(0,256)}, ${Math.random()})`,
      stroke: random.pick(rectColors).hex,
      fill: random.pick(rectColors).hex,
    });
  }
  const bgColor = random.pick(risoColors).hex;
  return ({ context, width, height }) => {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'black';
    rects.forEach(({ x, y, w, h, stroke, fill }) => {
      context.save();
      context.translate(x, y);

      context.strokeStyle = stroke;
      context.fillStyle = fill;
      context.lineWidth = 10;
      drawSkewedRect({ context: context, w: w, h: h, degree: degree });

      context.stroke();
      context.fill();
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
