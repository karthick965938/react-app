import React, { Fragment } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import {
  Form, Input, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col, Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody
} from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import swal from 'sweetalert';
library.add(faHeart, faEnvelope, faKey);


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      filter: "",
      items: []
    };
  }

  componentDidMount() {
    fetch("https://swapi.co/api/films/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  changePage = film => {
    // film
    var str = film.url
    var get_url = str.split('https://swapi.co/api');
    console.log(film.url)
    this.props.history.push(get_url[1])
  };

  doFavorite = film => {
    swal({
      title: "Added to favorite!",
      text: "This film added to your favorite list!",
      icon: "success",
    });
  };


  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const { error, filter, isLoaded, items } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = items.filter(item => {
      return Object.keys(item).some(key =>
        // console.log(item[key])
        item[key].toLowerCase().includes(lowercasedFilter)
      );
    });
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Fragment>
          <header>
            <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-white" style={{ height: 80 }}>
              <Container>
                <Row noGutters className="position-relative w-100 align-items-center">
                  <Col className="d-none d-lg-flex justify-content-start">
                    <Nav className="mrx-auto" navbar>
                      <NavItem className="d-flex align-items-center">
                        <NavLink className="font-weight-bold" href="/">
                          <img src={logo} alt="avatar" className="img-fluid rounded-circle" style={{ width: 36 }} />
                        </NavLink>
                      </NavItem>
                      <NavItem className="d-flex align-items-center">
                        <NavLink className="font-weight-bold" href="/">Home</NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                  <Col className="d-none d-lg-flex justify-content-end">
                    <Form inline>
                      <Input type="search" className="mr-3" placeholder="Search Films" />
                    </Form>
                  </Col>
                </Row>
              </Container>
            </Navbar>
          </header>

          <main className="my-5 py-5">
            <Container className="px-0">
              <Row>
                {items.map(film => (
                  <Col xs="6" sm="3">
                    <Card style={{cursor: 'pointer'}}>
                      <CardBody onClick={()=>this.changePage(film)}>
                        <CardTitle><b>{film.title}</b></CardTitle>
                        <CardText>{film.opening_crawl}</CardText>
                      </CardBody>
                      <Button outline color="success" onClick={()=>this.doFavorite(film)}><FontAwesomeIcon icon="heart"/></Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </main>
        </Fragment>
      );
    }
  }
}

