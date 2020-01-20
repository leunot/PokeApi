import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import BootstrapCard from "./BootstrapCard";
import FormFilter from "./FormFilter";

class Pokemon extends Component {
  state = {
    PokemonData: {},
    items: [],
    pokemonImg: [],
    isLoaded: false,
    pokemonTypes: [],
    isFiltered: false,
    oldPokemonData: {}
  };

  componentDidMount() {
    let pokemonimages = [];
    let pokemonTypes = [];
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

              pokemonimages[i] = pokemonAtI.sprites.front_default;
              pokemonTypes[i] = pokemonAtI.types;
              this.setState({
                pokemonImg: pokemonimages,
                pokemonTypes: pokemonTypes
              });
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
  saveType(val) {
    let newState = this.state;

    let filteredData = this.state.PokemonData.items.results.filter(function(
      data,
      index
    ) {
      let empty = true;
      let filtered = false;
      val.pokemonTypes.forEach(function(currentelement) {
        //console.log(index);
        // console.log(currentelement)
        if (currentelement !== "") {
          empty = false;
          if (newState.pokemonTypes[index + 1].length === 2) {
            if (
              newState.pokemonTypes[index + 1][1].type.name.includes(
                currentelement
              )
            ) {
              filtered = true;
            }
          }
          if (
            newState.pokemonTypes[index + 1][0].type.name.includes(
              currentelement
            )
          ) {
            filtered = true;
          }
        }
      });
      if (empty) filtered = true;
      return filtered;
    });
    this.setState({
      oldPokemonData: filteredData,
      filteredData: true
    });

    //this.state.PokemonData.items.results[1].name = "maybe";
  }

  render() {
    var { filteredData, oldPokemonData, isLoaded, PokemonData } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (!filteredData) {
      //console.log(this.state);
      //console.log(this.state.PokemonData);
      return (
        <div>
          <Container>
            <Row>
              <Col style={{ marginTop: "1%" }}>
                <FormFilter data={{ saveType: this.saveType.bind(this) }} />
              </Col>

              {PokemonData.items.results.map((element, index) => {
                return (
                  <Col
                    className="float-left"
                    key={element.name}
                    style={{ marginTop: "1%" }}
                  >
                    <div>
                      <BootstrapCard
                        element={element}
                        PokemonData={PokemonData}
                        index={index}
                      />
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
    } else {
      return (
        <div>
          <Container>
            <Row>
              <Col style={{ marginTop: "1%", maxWidth: "228px" }}>
                <FormFilter data={{ saveType: this.saveType.bind(this) }} />
              </Col>

              {oldPokemonData.map((element, index) => {
                return (
                  <Col
                    className="float-left"
                    key={element.name}
                    style={{ marginTop: "1%", maxWidth: "228px" }}
                  >
                    <div style={{}}>
                      <BootstrapCard
                        element={element}
                        PokemonData={PokemonData}
                        index={index}
                      />
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
