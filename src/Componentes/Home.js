import { useState} from 'react';
import axios from "axios";
import { Formik,Form,Field } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Item from './Item'


function Home() {
    const apiKey = "5967d35b3b1747bdbf9aa59b3d54d7ec";
    const apiUrl = "https://api.spoonacular.com/recipes/complexSearch"
    const [recetas,setRecetas]=useState([]);
    const SignupSchema = Yup.object().shape({
        valor: Yup.string().min(2).required('Required'),
    });
    const submitRecipes = async (values) =>{
        try{
            const url = apiUrl+"?apiKey="+apiKey+"&query="+values.valor+"&addRecipeInformation=true&addRecipeNutrition=true";
            const todosRecetas = await axios.get(url);
            console.log(todosRecetas.data.results);
            setRecetas(todosRecetas.data.results);
            if(todosRecetas.data.results.length === 0){
                swal("Recetas no encontradas!", "No se lograron encontrar recetas con ese nombre!", "warning");
                setRecetas([]);
            }
        }
        catch(error){
            swal("Se produjo un error al buscar recetas!", "Intentalo mas tarde", "error");
        }   
    }
    return(<div>
    <Container>
    <Row className='text-center'>
    <h1>Buscador de Recetas</h1>
    </Row>
    <Row className='justify-content-center'>
    <Card bg="dark" text="light" style={{ height:'5rem',width: '25rem'}}>
        <Card.Body>
            <Formik initialValues={{valor: ''}} validationSchema={SignupSchema} onSubmit={
                (values,actions)=>{
                    submitRecipes(values);
                    actions.resetForm({values:''});
                }}>
                <Form>
                    <Row>
                        <Col><Field placeholder="Buscar Receta"name="valor" type="text" /></Col>
                        <Col><Button variant="light" type="submit">Buscar</Button></Col>
                    </Row>
                </Form>
            </Formik>
        </Card.Body>
    </Card>
    </Row>
    </Container>
    <Container>
        <Row >
        {recetas !== [] && recetas.map(receta =>
        <Col key={receta.id} xs={12} s={12} md={6} lg={4}>
            <Item recetaDatos={receta}nombre={receta.title} img={receta.image} caracteristicas={receta.dishTypes} detalles={receta.pricePerServing}/>
        </Col>
        )}
        </Row>
    </Container>
    </div>);
}
export default Home;