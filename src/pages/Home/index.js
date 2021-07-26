import React, { useState, useEffect } from "react";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ListGroup } from "react-bootstrap";

function App(props) {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const [productData, setProductData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [loggedInUserData, setLoggedInUserData] = useState({});

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const getProductData = () => {
    fetch('data.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setProductData(myJson.products);
      });
  }

  useEffect(() => {
    getProductData()
  }, [])


  const handleSignup = (event) => {
    event.preventDefault();
    setShowSignupModal(false)

    if (!localStorage.getItem(`user+${email}`)) {
      const newUser = {
        email,
        password,
        name,
        address,
        cart: []
      };

      localStorage.setItem(`user+${email}`, JSON.stringify(newUser));
      alert('Usuário cadastrado com sucesso! Agora faça o login');
    }
    else {
      alert('Usuário com esse email já cadastrado!');
    }
  }

  const handleLogin = (event) => {
    event.preventDefault();
    setShowLoginModal(false);

    const informedUserData = JSON.parse(localStorage.getItem(`user+${email}`));
    if (informedUserData && informedUserData.password === password) {
      setLoggedInUser(informedUserData.email);
      setLoggedInUserData(informedUserData);

      console.log("loggedInUserData", loggedInUserData)
      alert('Login efetuado com sucesso!');
    }
    else {
      alert('Email ou senha incorretos, tente logar novamente!')
    }
  };

  const handleLogout = () => {
    setLoggedInUser('');
    alert('Você foi deslogado com sucesso!');
  };

  const addToCart = (id) => {
    loggedInUserData.cart.push(productData[id - 1]);
    localStorage.setItem(`user+${email}`, JSON.stringify(loggedInUserData));

    alert('Produto adicionado ao carrinho com sucesso');
  }

  const removeFromCart = (index) => {
    loggedInUserData.cart.splice(index, 1);
    localStorage.setItem(`user+${email}`, JSON.stringify(loggedInUserData));

    setShowCartModal(false);
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>Paddock Gamer</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {loggedInUser ? <Navbar.Brand>Olá, {loggedInUser}</Navbar.Brand> : ''}
              {!loggedInUser ?
                <Button variant="primary" onClick={() => setShowSignupModal(true)}>Cadastrar</Button>
                : <Button variant="primary" onClick={() => setShowCartModal(true)}>Ver Carrinho</Button>
              }
              {!loggedInUser ?
                <Button variant="primary" onClick={() => setShowLoginModal(true)}>Login</Button>
                : <Button variant="primary" onClick={handleLogout}>Logout</Button>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        size="lg"
        show={showSignupModal}
        onHide={() => setShowSignupModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-lg">
            Faça seu cadastro!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicFullname">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control type="text" placeholder="Digite seu nome por completo" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Endereço</Form.Label>
              <Form.Control type="text" placeholder="Digite seu endereço" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </Form.Group>

            <Button variant="primary" type="Enviar">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-lg">
            Faça seu Login!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <Button variant="primary" type="Enviar">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={showCartModal}
        onHide={() => setShowCartModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-lg">
            Seu carrinho
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {loggedInUser ? loggedInUserData.cart.map((product, index) => (
              <ListGroup.Item className="d-flex justify-content-between">{product.name} - {product.platform} - R$ {product.price.toFixed(2)} <Button onClick={() => removeFromCart(index)} variant="danger">Remover</Button></ListGroup.Item>
            )) : ''}
          </ListGroup>
          <ListGroup.Item><b>Total = R$ {loggedInUser ? loggedInUserData.cart.reduce((accumulator, current) => accumulator + current.price, 0).toFixed(2) : ''}</b></ListGroup.Item>
        </Modal.Body>
      </Modal>

      <Container className="mt-5">
        <Row className="d-flex justify-content-between">
          {productData.map((product) => (
            <Col md={6} lg={6} xl={4}>
              <Card className="mb-5 pt-3">
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name} - {product.platform}</Card.Title>
                  <Card.Text>R$ {product.price.toFixed(2)}</Card.Text>
                  {loggedInUser ? <Button key={product.id} onClick={() => addToCart(product.id)} variant="primary">Adicionar ao carrinho</Button> : <Button variant="primary" disabled>Adicionar ao carrinho</Button>}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <footer className="text-center text-light bg-primary p-2">
        <h6>Desenvolvido para o desafio 02 do Programa Hiring Coders 2021</h6>
        <a href="https://github.com/darthHunterous/hiringCoders-desafio02" className="text-light">
          <h6>Código deste site disponível no Github
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github"
              viewBox="0 0 16 16">
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </h6>
        </a>
      </footer>
    </>
  );
}

export default App;
