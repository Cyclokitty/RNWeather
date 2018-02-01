import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>{props.headerText}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#7EC0EE',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
    color: '#F8F8F8',
  }
});


export default Header;
