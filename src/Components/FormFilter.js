import React, { Component } from "react";
import { Col } from "react-bootstrap";
import SelectForm from "./SelectForm";

class FormFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { typeOne: "", typeTwo: "", typeThree: "", typeFour: "" };

    this.setTypes = this.setTypes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setTypes = tags => event => {
    this.setState({ [tags]: event.target.value });
  };

  handleSubmit(event) {
    this.props.data.saveType({
      pokemonTypes: [
        this.state.typeOne,
        this.state.typeTwo,
        this.state.typeThree,
        this.state.typeFour
      ]
    });
    event.preventDefault();
  }

  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <form onSubmit={this.handleSubmit}>
          <Col>
            <label>
              <select
                className="btn  btn-success"
                value={this.state.type}
                onChange={this.setTypes("typeOne")}
              >
                <SelectForm />
              </select>
            </label>
          </Col>
          <Col>
            <label>
              <select
                className="btn  btn-success"
                value={this.state.type}
                onChange={this.setTypes("typeTwo")}
              >
                <SelectForm />
              </select>
            </label>
          </Col>
          <Col>
            <label>
              <select
                className="btn  btn-success"
                value={this.state.type}
                onChange={this.setTypes("typeThree")}
              >
                <SelectForm />
              </select>
            </label>
          </Col>
          <Col>
            <label>
              <select
                className="btn  btn-success"
                value={this.state.type}
                onChange={this.setTypes("typeFour")}
              >
                <SelectForm />
              </select>
            </label>
          </Col>

          <input className="btn btn-primary" type="submit" value="Filter" />
        </form>
      </div>
    );
  }
}

export default FormFilter;
