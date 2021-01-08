import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {}
    };
  }

  render() {
    return (
      <div>
        <canvas id="myChart2" />this is a test
      </div>
    );
  }
}

export default App;
