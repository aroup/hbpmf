import * as React from 'react';
import Youtube from 'react-youtube';
type Props = {};

class YoutubeContainer extends React.Component<Props> {
  state = {
    videoId: '',
    objectId: ''
  };
  async componentDidMount() {
    this.interval = setInterval(async () => {
      const song_response = await fetch('songs', {
        method: 'get'
      });
      if (!song_response) {
        console.log('jibon toh ektai');
      } else {
        console.log(song_response);
        console.log('other half');
      }
      const song = await song_response.json();
      console.log(song);
      // const song = song_response.text() ? JSON.parse(song_response.response) : null;
      console.log(song);
      // console.log('what');
      const { youtube_link, _id } = song;
      if (!!youtube_link) {
        const videoId = this.retrieveYoutubeUrl(youtube_link);
        if (videoId != this.state.videoId) {
          this.setState({
            videoId,
            objectId: _id
          });
        }
      } else {
        this.setState({
          videoId: '',
          objectId: ''
        });
      }
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  retrieveYoutubeUrl(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }
  render() {
    const { videoId } = this.state;
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    };
    return (
      <Youtube
        videoId={videoId}
        onEnd={this.handleVideoEnd}
        onReady={this.handleOnReady}
        onStateChange={this.handleOnStateChange}
      />
    );
  }
  handleVideoEnd = event => {
    const { videoId, objectId } = this.state;
    let data = new FormData();
    data.append('json', JSON.stringify({}));
    fetch(`songs/${objectId}`, {
      method: 'post',
      body: data
    }).then(res => {
      this.setState({
        videoId: '',
        objectId: ''
      });
    });
  };
  handleOnReady = event => {
    console.log(event);
    event.target.playVideo();
  };
  handleOnStateChange = event => {
    event.target.playVideo();
  };
}

export default YoutubeContainer;
