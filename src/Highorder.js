import React, { Component } from 'react';
import Hoc from './HOC';

class Highorder extends Component {
  
  render() {
    return (
      <h4>
        Rendering from class component
      </h4>
    )
  }
}
Highorder = Hoc(Highorder);
export default Highorder;