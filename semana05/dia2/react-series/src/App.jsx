import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      pos: null,
      titulo: "Nuevo",
      id: 0,
      nombre: "",
      fecha: "",
      rating: "0",
      categoria: "",
    };
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioFecha = this.cambioFecha.bind(this);
    this.cambioRating = this.cambioRating.bind(this);
    this.cambioCategoria = this.cambioCategoria.bind(this);
    this.guardar = this.guardar.bind(this);
    this.editar = this.editar.bind(this);
  }

  cambioNombre(e) {
    this.setState({
      nombre: e.target.value,
    });
  }
  cambioFecha(e) {
    this.setState({
      fecha: e.target.value,
    });
  }
  cambioRating(e) {
    this.setState({
      rating: e.target.value,
    });
  }
  cambioCategoria(e) {
    this.setState({
      categoria: e.target.value,
    });
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/series/").then((res) => {
      console.log(res.data);
      this.setState({ series: res.data });
    });
  }

  editar(cod,index){
    axios.get('http://localhost:8000/api/series/'+cod)
    .then(res=>{
      this.setState({
        pos:index,
        titulo:'Editar',
        id:res.data.id,
        nombre:res.data.name,
        fecha:res.data.release_date,
        rating:res.data.rating,
        categoria:res.data.category
      })
    })
  }

  eliminar(cod){
    let rpta = window.confirm("estás seguro de eliminar el registro?");
    if (rpta) {
      //eliminar el registro
      axios.delete('http://localhost:8000/api/series/'+cod)
      .then(res =>{
        let temp = this.state.series.filter(serie => serie.id !==cod);
        this.setState({
          series: temp
        })
      })
    }
  }


  guardar(e){
    e.preventDefault();
    let cod = this.state.id;
    const datos = {
      name:this.state.nombre,
      release_date: this.state.fecha,
      rating:this.state.rating,
      category:this.state.categoria
    }
    if(cod>0){
      //actualizar
      axios.put('http://localhost:8000/api/series/'+cod,datos)
      .then(res =>{
        let indx = this.state.pos
        this.state.series[indx] = res.data;
        var temp = this.state.series;
        this.setState({
          pos:null,
          titulo:'Nuevo',
          id:0,
          nombre:'',
          fecha:'',
          rating:0,
          categoria:'',
          series:temp
        })
      }).catch((error)=>{
        console.log(error.toString());
      });
    }
    else{
      //nuevo registro
      axios.post('http://localhost:8000/api/series/',datos)
      .then(res => {
        this.state.series.push(res.data);
        var temp = this.state.series;
        this.setState({
          id:0,
          nombre:'',
          fecha:'',
          rating:0,
          categoria:'',
          series:temp
        });
      }).catch((error)=>{
        console.log(error.toString());
      });
    }
  }


  render() {
    return (
      <div>
        <Container>
        <h1>Series</h1>
        <Table  striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Rating</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.series.map((serie, index) => {
              return (
                <tr key={serie.id}>
                  <td>{serie.id}</td>
                  <td>{serie.name}</td>
                  <td>{serie.release_date}</td>
                  <td>{serie.rating}/10</td>
                  <td>{serie.category}</td>
                  <td><div className=" gap-2" style={{textAlign:'center'}}>
                  <Button  variant="success" onClick={()=>this.editar(serie.id,index)} >Editar</Button>{' '}
                  <Button variant="danger" onClick={()=>this.eliminar(serie.id)}>Eliminar</Button>
                  </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <br />
        <h1>{this.state.titulo}</h1>
        <Form onSubmit={this.guardar}>
          <Form.Control type="hidden" value={this.state.id} />
          <Form.Group className="mb-3">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              value={this.state.nombre}
              onChange={this.cambioNombre}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha:</Form.Label>
            <Form.Control
              type="date"
              value={this.state.fecha}
              onChange={this.cambioFecha}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rating:</Form.Label>
            <Form.Control
              type="text"
              value={this.state.rating}
              onChange={this.cambioRating}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoria:</Form.Label>
            <Form.Control
              type="text"
              value={this.state.categoria}
              onChange={this.cambioCategoria}
            />
          </Form.Group>
          <Button    style={{fontSize : "19px"}} variant="primary" type="submit">
            GUARDAR
          </Button>
        </Form>
        </Container>
      </div>
    );
  }
}

export default App;
