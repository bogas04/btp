import SearchBar from '../../layout/SearchBar';
import Feed from '../../layout/Feed';
import { Grid } from 'react-bootstrap';
import Loader from 'react-loader';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      results: [],
      keyword: this.props.location.query.q
    };
  }
  render() {
    const { results, loaded, keyword } = this.state;
    return (
      <Grid className="Searc" fluid>
        <h3> Search results for <code>{keyword}</code> </h3>
        <SearchBar value={keyword} />
        <Loader loaded={loaded} radius={50}>
          <Feed items={this.state.results}/>
        </Loader>
      </Grid>
    );
  }
  componentDidMount() {
    fetch(`/entity.json?q=${this.state.keyword}`)
    .then(r => r.json())
    .then(results => {
      this.setState({ results, loaded: true });
    })
    .catch(error => console.log(error));
  }
}
