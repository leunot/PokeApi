import React, { Component } from "react";
import { Button, Card, Row, Col, Container, Form } from "react-bootstrap";
import CardBackground from "./Images/hiclipart.com.png";

class Pokemon extends Component {
  state = {
    items: [],
    pokemonImg: [],
    isLoaded: false,
    pokemonImg: [],
    pokemonTypes: []
  };

  componentDidMount() {
    //get the first 150 Pokemon name and API link
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150")
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json
        });
        //loop through the API links and add the additional data to items.newData
        for (let i = 1; i < json.results.length + 1; i++) {
          fetch("https://pokeapi.co/api/v2/pokemon/" + i)
            .then(res => res.json())
            .then(pokemonAtI => {
              //console.log(pokemonAtI);
              //this.state.items.results[pokemonAtI.id].newData[i] =
              //pokemonAtI.sprites;
              this.state.pokemonImg[i] = pokemonAtI.sprites.front_default;
              this.state.pokemonTypes[i] = pokemonAtI.types;
            })
            .then(() => {
              //Set the state to loaded on the last fetch and combine data
              if (i > json.results.length - 1) {
                this.setState({
                  PokemonData: {
                    items: this.state.items,
                    pokemonImg: this.state.pokemonImg,
                    pokemonTypes: this.state.pokemonTypes
                  },
                  isLoaded: true
                });
              }
            });
        }
      });
  }

  render() {
    var { isLoaded, PokemonData } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(PokemonData);
      return (
        <div>
          <Container>
            <Row>
              {PokemonData.items.results.map((element, index) => {
                return (
                  <Col key={element.name} style={{ marginTop: "1%" }}>
                    <div key={PokemonData.pokemonImg[index + 1]}>
                      <Card
                        style={{
                          width: "192px",
                          backgroundImage: `url(${CardBackground})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100% 100%",
                          border: "none",
                          borderRadius: "0.65rem"
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={PokemonData.pokemonImg[index + 1]}
                        />
                        <Card.Body>
                          <Card.Title>
                            {index + 1 + ". " + element.name}
                          </Card.Title>
                          <Card.Text></Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                );
              })}

              {/* {PokemonData.items.results.map((element, index) => {
            return (
              <div>
                <img src={PokemonData.pokemonImg[index + 1]} />
                <p>{element.name}</p>
              </div>
            );
          })}
          ; */}
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default Pokemon;
