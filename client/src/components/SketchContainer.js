import React from 'react';
import { SketchField, Tools } from 'react-sketch';
import { Row, Col } from 'react-bootstrap';

import './SketchContainer.css';

const SketchContainer = (props) => {

  const { onDataChange, data } = props;

  const ref = React.useRef();

  React.useEffect(() => {
    console.log(data);
  }, [data])

  const onClick = (e) => {
    // console.log(ref.current.toJSON());
    const data = ref.current?.toJSON();
    onDataChange(data);
  }

  return (
    <Row className="sketch-container" onClick={onClick}>
      <Col>
        <SketchField
          tool={Tools.Rectangle}
          lineColor='black'
          lineWidth={3}
          ref={ref}
          forceValue
          // defaultValue={testData}
          value={data} />
      </Col>
    </Row>
  );
}

export default SketchContainer;
