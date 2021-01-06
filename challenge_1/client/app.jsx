import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search : '',
      page   : 1,
      data   : []
    };

    this.getEvents = this.getEvents.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getEvents(term, page) {
    axios
      .get(`http://localhost:3000/events?q=${term}&_page=${page}`)
      .then((events) => {
        this.setState({ currEvents: events });
      })
      .catch((err) => console.log(err));
  }

  handleChange(e) {
    // e.preventDefault();
    this.setState({ search: e.target.value });
  }

  handleSubmit() {
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
        {/* <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        /> */}
      </div>
    );
  }
}

export default App;
