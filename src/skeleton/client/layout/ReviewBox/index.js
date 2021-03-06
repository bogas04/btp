import { browserHistory as history } from 'react-router';
import { connect } from 'react-redux';
import styles from './styles';
import { Glyphicon, Button, FormControl, Thumbnail } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

export default connect(({user: { loggedIn }}) => ({ loggedIn }), {
})(
class ReviewBox extends React.Component {
  constructor(p) {
    super(p);
    this.state = { images: [], reviewBody: '', };
  }
  render() {
    const { loggedIn } = this.props;
    const { images } = this.state;

    let buttons =  loggedIn ? <div>
      { images.length > 0 && (images.length + ' Images') }
      <ul style={styles.imagePreview} >
        { images.map(i => <Thumbnail key={i.preview} height="100px" src={i.preview} />) }
      </ul>
      <Button onClick={() => this.refs.dropzone.open()}><Glyphicon glyph="camera" /> Upload Images</Button>
      {' '}
      <Button type="submit" bsStyle="info"><Glyphicon glyph="pencil" /> Submit</Button>
    </div> : <Button type="submit" bsStyle="info"><Glyphicon glyph="log-in" /> Login</Button>;

    return (
      <Dropzone accept="image/*" ref="dropzone" disableClick={true} onDrop={this.addImages.bind(this)} className={`ReviewBox`} style={styles.wrapper}>
        <form onSubmit={e => this.submit(e)}>

          <FormControl
            disabled={!loggedIn} rows="4" style={styles.textarea} componentClass="textarea"
            value={this.state.reviewBody} onChange={this.addReviewBody.bind(this)}
            placeholder={'Enter your comment ' + (!loggedIn ? ' (You need to be logged in first)' : '')}
          />

        {buttons}
      </form>
    </Dropzone>
    );
  }
  addImages(images) {
    this.setState({ images });
  }
  addReviewBody(e) {
    this.setState({ reviewBody: e.currentTarget.value });
  }
  submit(e) {
    e.preventDefault();

    const { loggedIn, entityId } = this.props;

    if (!loggedIn) { history.push('/login'); return; }

    const { reviewBody, images } = this.state;

    let body = new FormData();
    body.append('reviewBody', reviewBody);
    body.append('entityId', entityId);
    images.map(image => body.append('images', image));

    fetch(`/reviews.json/${images.length === 0 ? '': 'with_image'}`, {
      headers: { 'token': localStorage.getItem('token') },
      method: 'post', body,
    })
    .then(r => r.json())
    .then(r => {
      this.props.onSubmit();
      this.setState({ images: [], reviewBody: '' });
      console.log(r);
    });
  }
}
)
