import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';

const FootballMatch = ({ zapas, leagueId }) => {
    const handleButtonPress = () => {
        console.log(zapas);
      };
    console.log(leagueId.route.params.leagueId);
    if (zapas.liga == leagueId.route.params.leagueId)
    {
        return (
            <TouchableOpacity style={styles.container} onPress={() => handleButtonPress()}>
                <View style={{display: 'flex', flexDirection: "row"}}>
                    <Image style={styles.logo_home} source={{uri: zapas.logo_domaci}}></Image>
                    <Text style={styles.home_team}>{zapas.domaci}</Text>
                </View>
                <Text style={styles.time}>{zapas.cas}</Text>
                <View style={{display: 'flex', flexDirection: "row", height: 40}}>
                    <Image style={styles.logo_away} source={{uri: zapas.logo_hoste}}></Image>
                    <Text style={styles.away_team}>{zapas.hoste}</Text>
                </View>
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
  logo_home:{
    position: 'absolute',
    left: 20,
    width: '10%',
    height: '80%',
    top: 20
  },
  logo_away:{
    position: 'absolute',
    left: 20,
    width: '10%',
    height: '100%',
    top: -5
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

export default FootballMatch;