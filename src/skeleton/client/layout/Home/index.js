import { Jumbotron, Grid, Col } from 'react-bootstrap';
import { browserHistory as history } from 'react-router';
import config from '../../config';
import Loader from 'react-loader';
import Feed from '../Feed';
import SearchBar from '../SearchBar';
import Filters from '../../layout/Filters';

export default class Home extends React.Component {
  constructor(p) {
    super(p);
    this.state = { items: [], loaded: false };
    // Need better end point that puts weightage up
    fetch('/entity.json')
      .then(r => r.json())
      .then(items => {
        this.setState({ items, loaded: true });
      })
      .catch(error => console.log(error));
  }
  render() {
    const { loaded, items } = this.state;
    return (
      <div>
        <Jumbotron className="text-center">
          <img src={config.FAVICON} alt={`${config.APP_NAME} logo`}/>
          <h1 className="text-center"> Welcome to {config.APP_NAME} </h1>
          <Grid>
            <SearchBar />
          </Grid>
        </Jumbotron>
        <Grid className="Home" fluid>
          <Col md={2}> <Filters onFilter={this.search.bind(this)}/> </Col>
          <Col md={8}> <Loader loaded={loaded} radius={50}> <Feed items={items} /> </Loader> </Col>
          <Col md={2}></Col>
        </Grid>
      </div>
    );
  }
  search(filters) {
    history.push(`/search?q=${JSON.stringify(filters)}`);
  }
}
