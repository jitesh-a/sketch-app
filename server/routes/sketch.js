const express = require('express');
const router = express.Router();

const service = require('../services/sketch.service');

const MOCK_USER = 'dummy';

/*TODO: Add global error handler */

/* GET sketches */
router.get('/', async (req, res, next) => {
  try {
    const sketches = service.getSketches(MOCK_USER);
    res.status(200).send(sketches);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

/* GET sketch data */
router.get('/:fileName', async (req, res, next) => {
  try {
    const fileName = req.params.fileName;
    console.log(fileName);
    const sketchData = service.getSketchData(fileName, MOCK_USER);
    res.status(200).send(sketchData);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

/* POST sketch */
// TODO: Add validation for file name and other stuff
router.post('/', async (req, res, next) => {
  try {
    const { fileName, data } = req.body;
    console.log(fileName, data);
    const sketch = service.addSketch(data, fileName, MOCK_USER);
    res.status(200).send(sketch);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
