const calculateDistance = (x, y) => Math.sqrt(x ** 2 + y ** 2);

const getElementFullWidth = (name) => {
  const element = document.getElementById(name);
  const style = getComputedStyle(element);

  return element.offsetWidth + parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
};

const calculateCoorX = (x) => {
  const main = document.getElementById('main');
  const mainStyle = getComputedStyle(main);
  const canvasStartCoorX = parseInt(mainStyle.marginLeft, 10) + getElementFullWidth('menu');

  return x - canvasStartCoorX;
};

const calculateCoorY = (y) => {
  const header = document.getElementById('header');
  const headerStyle = getComputedStyle(header);
  const marginBottom = parseInt(headerStyle.marginBottom, 10);

  return y - header.offsetHeight - marginBottom;
};

module.exports = { calculateCoorX, calculateCoorY, calculateDistance };
