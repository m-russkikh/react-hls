import React, { PureComponent } from 'react';
import axios from 'axios';

import Player from '../../Player';


class AppContainer extends PureComponent {
  state = {
    source: '',
    title: '',
  };

  componentDidMount() {
    axios.get('../webcast.json')
      .then(response => response.data)
      .catch((error) => {
        console.warn('Error when load webcast.json', error);
        return {
          source: '',
          title: 'Ошибка при загрузке плейлиста',
        };
      })
      .then(({ source, title }) => {
        this.setState({
          source,
          title,
        });
      });
  }

  render() {
    const { source, title } = this.state;

    return (
      <Player source={source} title={title} />
    );
  }
}

export default AppContainer;
