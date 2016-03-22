/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

/**
 * For quota reasons we replaced the Rotten Tomatoes' API with a sample data of
 * their very own API that lives in React Native's Github repo.
 */
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

class MyProject extends Component {

constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }
  
componentDidMount() {
    this.fetchData();
  }
  
fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }
  
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
		  <Text style={styles.runtime}>{"RunTime: "+movie.runtime}</Text>
        </View>
      </View>
    );
  }
}



  
var styles = StyleSheet.create({
   container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
	borderWidth: 1,
  },
   rightContainer: {
    flex: 1,
  },
   title: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
	fontSize: 12,
	fontWeight: 'bold', 
	color: 'red',
    textAlign: 'center',
  },
  runtime: {
	fontSize: 12,
	//fontWeight: 'bold', 
	//color: 'yelloy',
    textAlign: 'center', 
  },
  thumbnail: {
    width: 53,
    height: 81,
	//marginLeft: 5,
	//marginTop: 5,
	//marginBottom: 5,
	margin: 5,
  },
  listView: {
    paddingTop: 8,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('MyProject', () => MyProject);
