import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search : 'king'
    };

    this.getEvents = this.getEvents.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getEvents(term) {
    axios
      .get(`http://localhost:3000/events?q=${term}`)
      .then((events) => console.log('events', events))
      .catch((err) => console.log(err));
  }

  handleChange(e) {
    // e.preventDefault();
    this.setState({ search: e.target.value });
  }

  handleSubmit() {
    console.log('searched');
    this.getEvents(this.state.search);
  }

  render() {
    return (
      <div>
        {/* <form> */}
        <input type="text" placeholder="search" value={this.state.search} onChange={this.handleChange} />
        <button
          type="submit"
          onClick={() => {
            this.handleSubmit();
          }}
        >
          search
        </button>
        {/* </form> */}
      </div>
    );
  }
}

export default App;
