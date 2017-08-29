import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCRT3f9z4Bf54ue3DqRWHxBAqUaPchJ1Zw',
      authDomain: 'auth-38535.firebaseapp.com',
      databaseURL: 'https://auth-38535.firebaseio.com',
      projectId: 'auth-38535',
      storageBucket: 'auth-38535.appspot.com',
      messagingSenderId: '533225997293'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

renderContent() {
  switch (this.state.loggedIn) {
    case true:
      return (
        <CardSection>
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        </CardSection>
      );
    case false:
      return <LoginForm />;
    default:
      return <Spinner size="large" />;
  }
}

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
