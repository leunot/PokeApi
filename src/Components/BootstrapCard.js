import React, { Component } from "react";
import { Card } from "react-bootstrap";
import CardBackground from "./Images/hiclipart.com.png";
class BootstrapCard extends Component {
  render() {
    return (
      <Card
        style={{
          width: "192px",
          maxWidth: "192px",
          backgroundImage: `url(${CardBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          border: "none",
          borderRadius: "0.65rem"
        }}
      >
        <Card.Img
          variant="top"
          src={
            this.props.PokemonData.pokemonImg[
              this.props.element.url.slice(34, -1)
            ]
          }
        />
        <Card.Body>
          <Card.Title>
            {this.props.index + 1 + ". " + this.props.element.name}
          </Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default BootstrapCard;
