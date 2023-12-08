import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet} from 'react-native';

const FotbalovyZapas = ({ zapas }) => {
    const handleButtonPress = () => {
        console.log(zapas);
      };
    if (zapas.liga == ligaid)
    {
        return (
            <TouchableOpacity style={styles.container} onPress={() => handleButtonPress()}>
                <Image style={styles.logo} source={{uri: zapas.logo_domaci}}></Image>
                <Text style={styles.home_team}>{zapas.domaci}</Text>
                <Text style={styles.time}>{zapas.cas}</Text>
                <Image style={styles.logo} source={{uri: zapas.logo_hoste}}></Image>
                <Text style={styles.away_team}>{zapas.hoste}</Text>
            </TouchableOpacity>
        );
    }
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
  },
  score:{
    paddingLeft: 300,
    paddingTop: 15,
    color: 'white',
  },
  button: {
    width: '100%',
    height: '100%',
  }
});

export default FotbalovyZapas;
