const BASE_URL = 'http://localhost:8080/sketch';

const saveSketch = (data, fileName) => {
  const body = {
    fileName,
    data: data
  }
  return new Promise((resolve, reject) => {
    // TODO - move method, headers to const file / use axios
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

const getSketches = () => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL, {
      method: 'GET',
    })
      .then(res => resolve(res.json()))
      .catch(err => reject(err))
  })
}

const getSketchData = (fileName) => {
  const URL = `${BASE_URL}/${fileName}`;
  return new Promise((resolve, reject) => {
    fetch(URL, {
      method: 'GET',
    })
      .then(res => resolve(res.json()))
      .catch(err => reject(err))
  })
}

export default {
  saveSketch,
  getSketches,
  getSketchData
}