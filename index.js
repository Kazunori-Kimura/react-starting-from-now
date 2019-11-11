const drawRect = ({ width = 100, height = 100, position = { x: 0, y: 0 } } = {}) => {
    return `x1=${position.x},y1=${position.y},x2=${position.x + width},y2=${position.y + height}`;
  };
  
  console.log(drawRect({ width: 200, position: {x: 50, y: 100} }));