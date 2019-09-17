import React, { Fragment } from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import '../App.css';
import {
  Form, Input, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col, Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody
} from 'reactstrap';
import ReactTooltip from 'react-tooltip';

export default class IndividualFilm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };
  }

  componentDidMount() {
    console.log(this)
    fetch("https://swapi.co/api/films/"+this.props.match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result
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

  render() {
    const { error, isLoaded, data } = this.state;
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
                <Col>
                  <Card>
                    <CardBody>
                      <CardTitle><b>Title:</b> {data.title}</CardTitle>
                      <CardText><b>Opening Crawl:</b> {data.opening_crawl}</CardText>
                      <CardText><b>Characters:</b> {data.characters}</CardText>
                      <CardText><b>Created:</b> {data.created}</CardText>
                      <CardText><b>Director:</b> {data.director}</CardText>
                      <CardText><b>Edited:</b> {data.edited}</CardText>
                      <CardText><b>Episode Id:</b> {data.episode_id}</CardText>
                      <CardText><b>Planets:</b> {data.planets}</CardText>
                      <CardText><b>Producer:</b> {data.producer}</CardText>
                      <CardText><b>Release Date:</b> {data.release_date}</CardText>
                      <CardText><b>Species:</b> {data.species}</CardText>
                      <CardText><b>Starships:</b> {data.starships}</CardText>
                      <CardText><b>Url:</b> {data.url}</CardText>
                      <CardText><b>Vehicles:</b> {data.vehicles}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </main>
        </Fragment>
      );
    }
  }
}

