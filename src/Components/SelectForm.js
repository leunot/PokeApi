import React, { Component } from "react";
class SelectForm extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <option value="">Type</option>
        <option value="normal">normal</option>
        <option value="fighting">fighting</option>
        <option value="flying">flying</option>
        <option value="ground">ground</option>
        <option value="rock">rock</option>
        <option value="bug">bug</option>
        <option value="ghost">ghost</option>
        <option value="steel">steel</option>
        <option value="fire">fire</option>
        <option value="water">water</option>
      </React.Fragment>
    );
  }
}

export default SelectForm;
