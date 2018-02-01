/**
 * React Native Weather App
 * https://github.com/Cyclokitty/RNWeather
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import axios from 'axios';
import Header from './components/Header';


let imageIcon;

export default class App extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      lon: null,
      error: null,
      name: '',
      weather: '',
      temp: '',
      icon: '',
      descrp: ''
    }
  }

  getWeather() {
    const weather = axios.get(`https://fcc-weather-api.glitch.me/api/current?lon=${this.state.lon}&lat=${this.state.lat}`)
      .then((response) => {
        console.log(response);
        this.setState({
          weather: response.data,
          name: response.data.name.toUpperCase(),
          temp: Math.floor(response.data.main.temp),
          icon: response.data.weather[0].icon,
          descrp: response.data.weather[0].description
        });
        console.log(`City: ${this.state.name}`);
        imageIcon = this.state.icon;
        console.log(imageIcon);
      });
  }

  componentWillMount() {
      navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           lat: parseFloat(position.coords.latitude),
           lon: parseFloat(position.coords.longitude),
           error: null,
         }, () => this.getWeather());
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }


  render() {
    return (
      <View style={styles.container}>
        <Header headerText='WEATHER'/>
        <View style={styles.weatherBox}>
          <Text style={styles.weatherText}>
            {this.state.name}
          </Text>
          <Text style={styles.weatherText}>{this.state.temp}&deg;C</Text>
          <Image
            style={styles.imageStyle}
            source={{uri: this.state.icon}} />
          <Text style={styles.weatherText}>
            {this.state.descrp}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#7EC0EE',
  },
  weatherBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  weatherText: {
    fontSize: 30,
    padding: 10,
    color: '#F8F8F8'
  },
  imageStyle: {
    height: 50,
    width: 50,
  },
});
