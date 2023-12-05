import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const FotbalovyZapas = ({ zapas }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.home_team}>{zapas.domaci}</Text>
      <Text style={styles.time}>{zapas.cas}</Text>
      <Text style={styles.away_team}>{zapas.hoste}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:135,
    borderTopWidth: 1,
    borderColor: '#494949',
  },
  home_team: {
    color: 'white',
    paddingTop: 26,
    paddingLeft: 65,
    fontSize: 16,
  },
  away_team: {
    color: 'white',
    paddingTop: 5,
    paddingLeft: 65,
    fontSize: 16,
  },
  time:{
    paddingLeft: 300,
    paddingTop: 15,
    color: 'white',
  }
});

export default FotbalovyZapas;
