import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search    : '',
      page      : 1,
      data      : [],
      offset    : 0,
      pageCount : 0
    };

    this.getEvents = this.getEvents.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getEvents(term, page) {
    axios
      .get(`http://localhost:3000/events?q=${term}&_page=${page}`)
      .then((events) => {
        this.setState({
          data      : events.data,
          pageCount : Math.ceil(events.headers["x-total-count"] / 10)
        });
      })
      .catch((err) => console.log(err));
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ search: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getEvents(this.state.search, this.state.page);
  }

  componentDidMount() {
    this.getEvents(this.state.search, this.state.page);
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * 10);

    this.setState({ offset: offset }, () => {
      this.getEvents(this.state.search, this.state.page);
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="search" value={this.state.search} onChange={this.handleChange} />
          <button type="submit">search</button>
        </form>
        <ReactPaginate
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
        />
      </div>
    );
  }
}

export default App;
