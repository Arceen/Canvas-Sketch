const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const Color = require('canvas-sketch-util/color');
const risoColors = require('riso-colors');

const settings = {
  dimensions: [1080, 1080],
  // animate: true,
};

const sketch = ({ context, width, height }) => {
  const num = 40;
  const degree = -30;
  const rectColors = [
    random.pick(risoColors),
    random.pick(risoColors),
    random.pick(risoColors),

    random.pick(risoColors),
  ];
  const rects = [];
  for (let i = 0; i < num; i++) {
    rects.push({
      x: random.range(0, width),
      y: random.range(0, height),
      w: random.range(300, width),
      h: random.range(40, 200),
      // stroke: 'black',
      // fill: `rgba(${random.range(0,256)}, ${random.range(0,256)} , ${random.range(0,256)}, ${Math.random()})`,
      stroke: random.pick(rectColors).hex,
      fill: random.pick(rectColors).hex,
      blend: Math.random() > 0.3 ? 'overlay' : 'source-over',
    });
  }
  const bgColor = random.pick(risoColors).hex;
  return ({ context, width, height }) => {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, width, height);

    context.lineWidth = 10;
    context.translate(width * 0.5, height * 0.5);
    // context.beginPath();
    // context.moveTo(0, -300);
    // context.lineTo(300, 200);
    // context.lineTo(-300, 200);

    // context.closePath();
    drawPolygon({
      context,
      radius: 400,
      sides: 7
    });
    context.stroke();
    context.clip();
    rects.forEach(({ x, y, w, h, stroke, fill, blend }) => {
      context.save();
      context.translate(-width * 0.5, -height * 0.5);
      context.translate(x, y);
      context.globalCompositeOperation = blend;
      context.strokeStyle = stroke;
      context.fillStyle = fill;
      context.lineWidth = 10;
      drawSkewedRect({ context: context, w: w, h: h, degree: degree });

      context.shadowColor = Color.style(Color.offsetHSL(fill, 0, 0, -20).rgba);
      context.shadowOffsetX = -10;
      context.shadowOffsetY = 20;
      context.fill();

      context.shadowColor = null;
      context.stroke();
      context.globalCompositeOperation = 'source-over';
      context.lineWidth = 2;
      context.strokeStyle = 'black';
      context.stroke();

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

const drawPolygon = ({ context, radius = 100, sides = 3 }) => {
  const slice = (2 * Math.PI) / sides;
  context.beginPath();
  context.moveTo(0, -radius);
  // context.lineTo(radius * Math.cos(0), radius * Math.sin(0));
  // context.lineTo(radius * Math.cos(90), radius * Math.sin(180));
  for (let i = 1; i < sides; i++) {
    // console.log(theta);
    const theta = i * slice - 0.5 * Math.PI;
    context.lineTo(radius * Math.cos(theta), radius * Math.sin(theta));
  }
  context.closePath();
};

canvasSketch(sketch, settings);
