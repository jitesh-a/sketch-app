const fs = require('fs');
const path = require('path');


const BASE_PATH = path.resolve(__basedir, `public/sketches`);

const getSketches = (user) => {
  const PATH = path.resolve(BASE_PATH, user);
  const sketches = fs.readdirSync(PATH);
  return sketches;
}

const getSketchData = (fileName, user) => {
  const PATH = path.resolve(BASE_PATH, user, fileName);
  const sketchData = fs.readFileSync(PATH);
  return sketchData;
}

const addSketch = (data, fileName, user) => {
  const PATH = path.resolve(BASE_PATH, user, fileName);
  const result = fs.writeFileSync(PATH, JSON.stringify(data));
  return result;
}

module.exports = {
  getSketches,
  addSketch,
  getSketchData
}