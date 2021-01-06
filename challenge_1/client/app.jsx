import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import List from './List.jsx';

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
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  getEvents(term, start) {
    axios
      .get(`http://localhost:3000/events?q=${term}&_start=${start}&_limit=10`)
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
    this.getEvents(this.state.search, this.state.offset);
  }

  componentDidMount() {
    this.getEvents(this.state.search, this.state.offset);
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * 10);

    this.setState({ offset: offset },
      this.getEvents(this.state.search, this.state.offset)
    );
    console.log(this.state.data)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="search" value={this.state.search} onChange={this.handleChange} />
          <button type="submit">search</button>
        </form>
        <List data={this.state.data} />
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
