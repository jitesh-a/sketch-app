import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, DropdownButton, ButtonGroup, Dropdown, Spinner } from 'react-bootstrap';

import SketchContainer from './components/SketchContainer';

import Service from './services/sketch.service';

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const [data, setData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSketch, setSelectedSketch] = useState(null);
  const [savedSketches, setSavedSketches] = useState([]);

  useEffect(() => {
    loadSketches();
  }, [])

  const loadSketches = async () => {
    setLoading(true);
    try {
      const res = await Service.getSketches();
      console.log(res);
      setSavedSketches(res);
    } catch (e) {

    } finally {
      setLoading(false);
    }
  }

  const onDataChange = (data) => {
    if (data !== null && data !== undefined)
      setData({ ...data });
  }

  const onResetClick = (e) => {
    setData({
      objects: []
    });
    setFileName('');
    setSelectedSketch(null);
  }

  const onSaveClick = async (e) => {
    setSaving(true);
    try {
      const res = await Service.saveSketch(data, fileName);
      setSelectedSketch(fileName);
      loadSketches();
      // TODO: replace with tooltip
      alert('Saved..!');
    } catch (e) {

    } finally {
      setSaving(false);
    }
  }

  const onNameChange = (e) => {
    setFileName(e.target.value);
  }

  const onSketchSelect = async (fileName) => {
    console.log(fileName);
    setSelectedSketch(fileName);
    setFileName(fileName);
    setLoading(true);
    try {
      const res = await Service.getSketchData(fileName);
      console.log(res);
      setData(res);
    } catch (e) {

    } finally {
      setLoading(false);
    }
  }

  const renderSketchContainer = () => {
    return (
      <SketchContainer
        onDataChange={onDataChange}
        data={data} />
    )
  }

  const renderActionsBar = () => {
    return (
      <Row>
        <Col>
          <Button variant="primary" onClick={onResetClick}>Create New..</Button>
          {
            loading
              ? <Spinner animation="border" variant="primary" className="margin-left-1" />
              :
              <ButtonGroup className="margin-left-1">
                <DropdownButton as={ButtonGroup} title="Load existing" id="bg-nested-dropdown">
                  {
                    savedSketches.map(sketch => <Dropdown.Item
                      eventKey={sketch}
                      key={sketch}
                      onSelect={onSketchSelect}>
                      {sketch}
                    </Dropdown.Item>)
                  }
                </DropdownButton>
              </ButtonGroup>
          }


          {
            data?.objects?.length
              ? (
                <>
                  <Button variant="secondary  " className="margin-left-1 float-right" onClick={onResetClick}>Reset</Button>
                  <Button
                    className="margin-left-1 float-right"
                    variant="success"
                    disabled={saving}
                    onClick={!saving ? onSaveClick : null}
                  >
                    {saving ? 'Saving…' : 'Save'}
                  </Button>

                  <Form.Control
                    disabled={selectedSketch !== null}
                    type="text"
                    placeholder="Name"
                    className="float-right file-name"
                    value={fileName}
                    onChange={onNameChange} />

                </>
              ) : []
          }
        </Col>
      </Row>
    )
  }

  const renderHeader = () => {
    return (
      <Row>
        <Col>
          <h1> Welcome to Sketch App - [Rectangle Only]</h1>
          <hr />
          <p>
            You can create, save and load previously saved sketches here. Happy sketching..!
          </p>
        </Col>
      </Row>
    )
  }


  return (
    <Container fluid className="app">
      {renderHeader()}
      {renderActionsBar()}
      {renderSketchContainer()}
    </Container>
  );
}

export default App;
