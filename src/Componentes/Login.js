import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import swal from 'sweetalert';
import { useState } from 'react';
import '../css/login.css';

function Login(){
    const urlAlkemy="http://challenge-react.alkemy.org/";
    const [mail,setMail] = useState('');
    const [contraseña,setContraseña] = useState('');
    const [disableButton,setDisableButton] = useState(false);
    const submitLogin= async e =>{
        e.preventDefault();
        try{
            if(mail === "" || contraseña === ""){
                swal("Campos Vacios!", "Falta agregar el Correo o la Contraseña!", "warning");
            }
            else{
            setDisableButton(true);
            const user = {mail,contraseña};
            await axios.post(urlAlkemy,{
            email: mail,
            password: contraseña
            }).then((res)=>{
                swal("Sesion Exitosa !","Se inicio sesion de forma exitosa!","success")
                .then(function() {window.location = "/";});
                window.localStorage.setItem('logged',JSON.stringify(res));
            });
            }
        }
        catch{
            setDisableButton(false);
            swal("Usuario Incorrecto","Datos ingresados no validos!","error");
        }
    }
    return(
    <Container fluid className='fondo'>
        <Row>
            <Col>
                <Card bg="dark" text="light" style={{ width: '30rem', height:'18rem' }}>
                    <Card.Body >
                        <Card.Title>Login</Card.Title>
                        <Form onSubmit={submitLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Correo Electronico</Form.Label>
                                <Form.Control value={mail} onChange={(e)=>setMail(e.target.value)} type="email" placeholder="Escribir Correo" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control value={contraseña} onChange={(e)=>setContraseña(e.target.value)}type="password" placeholder="Escribir Contraseña" />
                            </Form.Group>
                            <Button disabled={disableButton} variant="light" type="submit">
                                Entrar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    );
}
export default Login;