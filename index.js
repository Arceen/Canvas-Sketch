const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'white';
    let x = 0.5 * width;
    let y = 0.5 * height;
    let w = 100;
    let h = 100;
    context.fillStyle = 'white';
    context.fillRect(x - 0.5 * w, y - 0.5 * h, w, h);
  };
};
canvasSketch(sketch, settings);
