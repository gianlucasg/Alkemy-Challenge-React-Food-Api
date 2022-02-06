import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
function Item(props) {
  const [enMenu,setEnMenu] = useState(false);
  const [detalle, setDetalle] = useState(false);

  return (
    <Card className="mt-3"style={{ width: '20rem' }}>
      <Card.Header>{props.nombre}</Card.Header>
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.caracteristicas}</Card.Title>
          <Row>
            <Collapse in={detalle}>
              <Card.Text>{props.detalles}</Card.Text>
            </Collapse>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button variant="outline-dark" onClick={() => setDetalle(!detalle)}>Detalle</Button>
            </Col>
            <Col>
              {!enMenu &&
              <Button variant="outline-success">Agregar Menu</Button>
              }
              {enMenu &&
              <Button variant="outline-danger">Eliminar</Button>
              }
            </Col>
          </Row>
      </Card.Body>
    </Card>
  );
}

export default Item;